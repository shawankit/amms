const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllInvoiceOfCustomerQuery = require('../queries/get-invoices-of-customer-query');


const get = async (req) => {
    const { date } = req.query;

    logInfo('Request to fetch all transactions by date',{});

    const response = await db.find(new GetAllInvoiceOfCustomerQuery(id));

    return respond(response,'Successfully Fetched All Transactions', 'Failed to fetch Transactions')
}


Route.withOutSecurity().noAuth().get('/transactions',get).bind();