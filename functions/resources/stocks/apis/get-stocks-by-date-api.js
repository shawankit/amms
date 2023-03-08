const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const db = require('db/repository');
const GetTodayStocksQuery = require('../queries/get-todays-stocks-query');

const get = async (req) => {

    const { date } = req.query;

    logInfo('Request to get todays stocks',{});

    const response = await  db.execute(new GetTodayStocksQuery(date));;
    
    return respond(response,'Successfully fetched stocks', 'Failed to get stocks')
}

Route.withOutSecurity().noAuth().get('/stocks-by-date',get).bind();

