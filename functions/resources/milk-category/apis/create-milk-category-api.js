const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateMilkCategoryQuery = require('../queries/create-milk-category-query');

const post = async (req) => {
    const { name , rate, taxable, gstRate}
     = req.body;

    logInfo('Request to create milk-category',name);

    const id = uuid.v4();

    const response = await db.execute(new CreateMilkCategoryQuery(id,name,rate,taxable, gstRate));

    return respond(response,'Successfully Created milk-category', 'Failed to create milk-category')
}

Route.withOutSecurity().noAuth().post('/milk-category',post).bind();

