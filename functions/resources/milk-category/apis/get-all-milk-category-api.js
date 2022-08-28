const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAllMilkCategoryQuery = require('../queries/get-all-milk-category-queries');


const get = async (req) => {

    const { customerId } = req.query; 

    logInfo('Request to fetch all milk-category',{});

    const response = await db.find(new GetAllMilkCategoryQuery(customerId));

    return respond(response,'Successfully Fetched All milk-category', 'Failed to fetch milk-category')
}


Route.withOutSecurity().noAuth().get('/milk-category',get).bind();
