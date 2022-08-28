const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateBulkStocksQuery = require('../queries/create-bulk-stocks-queries');
const { perform } = require('../services/get-stocks-carryforwards-service');

const post = async (req) => {
    const { stocks } = req.body;

    logInfo('Request to create stocks',{stocks});

    const response = await db.execute(new CreateBulkStocksQuery(stocks));

    return respond(response,'Successfully Created stocks', 'Failed to create stocks')
}

Route.withOutSecurity().noAuth().post('/stocks',post).bind();

