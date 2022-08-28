const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllInvoiceOfCustomerQuery = require('../queries/get-invoices-of-customer-query');


const get = async (req) => {
    const { id } = req.params;

    logInfo('Request to fetch all customers invoices',{});

    const response = await db.find(new GetAllInvoiceOfCustomerQuery(id));

    return respond(response,'Successfully Fetched All invoices', 'Failed to fetch invoices')
}


Route.withOutSecurity().noAuth().get('/customers/:id/invoices',get).bind();