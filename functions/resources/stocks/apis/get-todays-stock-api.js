const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const { perform } = require('../services/get-stocks-carryforwards-service');
const GetTodayStocksQuery = require('../queries/get-todays-stocks-query');
const moment = require('moment');
const db = require('db/repository');

const get = async (req) => {

    const { date } = req.query;

    logInfo('Request to get todays stocks',{});

    const response = date === moment().format('YYYY-MM-DD') ? await perform() : await composeResult(
        () => db.execute(new GetTodayStocksQuery(date))
    )();
    
    return respond(response,'Successfully fetched stocks', 'Failed to get stocks')
}

Route.withOutSecurity().noAuth().get('/stocks',get).bind();

