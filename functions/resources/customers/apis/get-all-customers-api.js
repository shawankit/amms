const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllCustomerQuery = require('../queries/get-all-customers-queries');


const get = async (req) => {

    logInfo('Request to fetch all customers',{});

    const response = await db.find(new GetAllCustomerQuery());

    return respond(response,'Successfully Fetched All customers', 'Failed to fetch customers')
}


Route.withOutSecurity().noAuth().get('/customers',get).bind();
