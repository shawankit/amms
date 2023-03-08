const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const { perform } = require('../services/get-stocks-carryforwards-service');

const get = async (req) => {

    logInfo('Request to get todays stocks',{});

    const response = await perform();
    
    return respond(response,'Successfully fetched stocks', 'Failed to get stocks')
}

Route.withOutSecurity().noAuth().get('/stocks',get).bind();

