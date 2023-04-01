const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const R = require('ramda');
const GetPaymentReceiptsQuery = require('../queries/get-payments-receipts-query');


const get = async (req) => {

    const { search, offset, limit, filters } = req.query; 

    logInfo('Request to fetch all payment-receipts',{});

    const parsedFilters = !R.isNil(filters) && !R.isEmpty(filters) && JSON.parse(filters); 
    const response = await db.find(new GetPaymentReceiptsQuery(search, offset, limit, parsedFilters));

    return respond(response,'Successfully Fetched All payment-receipts', 'Failed to fetch payment-receipts')
}


Route.withOutSecurity().noAuth().get('/payment-receipts',get).bind();
