const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetCustomersWithDueQuery = require('../queries/get-customers-with-due-query');


const get = async (req) => {

    logInfo('Request to fetch all customers',{});

    const response = await db.find(new GetCustomersWithDueQuery());

    return respond(response,'Successfully Fetched All customers with dues', 'Failed to fetch customers with dues')
}


Route.withOutSecurity().noAuth().get('/customers/dues',get).bind();
