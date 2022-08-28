const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAInvoiceQuery = require('../queries/get-a-invoice-query');


const get = async (req) => {
    const { id } = req.params;

    logInfo('Request to fetch all customers',{});

    const response = await db.findOne(new GetAInvoiceQuery(id));

    return respond(response,'Successfully Fetched invoice details', 'Failed to fetch invoice details')
}


Route.withOutSecurity().noAuth().get('/invoices/:id',get).bind();