const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteCustomerQuery = require('../queries/delete-customer-query');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete customers',{});

    const response = await db.find(new DeleteCustomerQuery(id));

    return respond(response,'Successfully Deleted customers', 'Failed to delete customers')
}


Route.withOutSecurity().noAuth().delete('/customers/:id',get).bind();
