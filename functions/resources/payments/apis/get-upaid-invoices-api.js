const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetUnpaidInvoicesOfCustomerQuery = require('../queries/get-unpaid-invoices-by-customer-id-query');


const get = async (req) => {
    const { id } = req.params;

    logInfo('Request to fetch all customers unpaid invoices',{});

    const response = await db.find(new GetUnpaidInvoicesOfCustomerQuery(id));

    return respond(response,'Successfully Fetched All unpaid invoices', 'Failed to fetch unpaid invoices')
}


Route.withOutSecurity().noAuth().get('/customers/:id/unpaid-invoices',get).bind();