const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllUsersQuery = require('../queries/get-all-users-query');


const get = async (req) => {

    logInfo('Request to fetch all users',{});

    const response = await db.find(new GetAllUsersQuery());

    return respond(response,'Successfully Fetched All Users', 'Failed to fetch users')
}


Route.withOutSecurity().noAuth().get('/users',get).bind();
