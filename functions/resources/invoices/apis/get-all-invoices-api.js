const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const R = require('ramda');
const GetAllInvoiceQuery = require('../queries/get-all-invoices-query');
const GetInvoicesByDateQuery = require('../queries/get-invoices-by-date-query ');


const get = async (req) => {

    const { search, offset, limit, date, type } = req.query;


    logInfo('Request to fetch all ivoices',{});

    const response = await R.ifElse(
        () => R.isNil(date),
        () => db.find(new GetAllInvoiceQuery(search, offset, limit, type)),
        () => db.find(new GetInvoicesByDateQuery(date))
    )();
    
    return respond(response,'Successfully Fetched All invoices', 'Failed to fetch invoices')
}


Route.withOutSecurity().noAuth().get('/invoices',get).bind();