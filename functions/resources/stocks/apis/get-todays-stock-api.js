const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetTodayStocksQuery = require('../queries/get-todays-stocks-query');
const GetAllMilkCategoryQuery = require('../../milk-category/queries/get-all-milk-category-queries');
const CreateBulkStocksQuery = require('../queries/create-bulk-stocks-queries');
const { perform } = require('../services/get-stocks-carryforwards-service');

const get = async (req) => {

    logInfo('Request to get todays stocks',{});

    const response = await composeResult(
        (stocks) => {
            if(stocks.length == 0){
                return perform();
            }
            return Result.Ok(stocks);
        },
        () => db.execute(new GetTodayStocksQuery())
    )();
        

    return respond(response,'Successfully fetched stocks', 'Failed to get stocks')
}

Route.withOutSecurity().noAuth().get('/stocks',get).bind();

