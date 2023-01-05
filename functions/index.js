require('app-module-path').addPath(__dirname);
const express = require('express');
const Route = require('route');
const cors = require('cors');
const config = require('config-handler');
const bodyParser = require('body-parser');
const ApiError = require('lib/functional/api-error');
const ValidationError = require('lib/validation-error');
const { logError } = require('lib/functional/logger');

const app = express();
const server = require('http').createServer(app);

Route.setApp(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require("./passport")(app);
require('./api-routes');

app.use((req, res, next) => {
    const err = new ApiError(404, 'Not Found', 'Resource Not Found!');
    next(err);
});

config.port = 8000;
app.use((error, request, response, next) => {
    if (error.constructor === ApiError) {
        logError('Failed to execute the operation', error.error);
        if (error.code) { response.status(error.code); }

        response.send({
            status: false,
            errorType: 'api',
            message: error.errorMessage
        });
    } else if (error.constructor === ValidationError) {
        logError('Failed to execute the operation', error.errorMessage);
        response.send({
            status: false,
            errorType: 'validation',
            message: error.errorMessage
        });
    } else {
        console.error(error);
        response.status(501);
        logError('Failed to execute the operation', error);
        response.send({
            status: false,
            errorType: 'unhandled',
            message: 'Something went wrong!'
        });
    }
});

process.on('unhandledRejection', (error) => {
    logError('unhandledRejection', { error });
});

process.on('uncaughtException', (error) => {
    logError('uncaughtException', { error });
});

console.log(config.port);
server.listen(config.port, () => {
    console.log(`Express server listening on port ${config.port}`);
});
