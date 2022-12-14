const functions = require('firebase-functions');
const config = require('config');

const firbaseConfig = functions.config();
const configEnv = firbaseConfig.env;

if (configEnv && configEnv.config) {
    module.exports = require(`config/dev.json`);
} else {
    module.exports = config;
}
