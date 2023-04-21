const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateMilkCategoryQuery = require('../queries/update-milk-category-query');

const post = async (req) => {

    const { id } = req.params; 
    const { name , rate, taxable, gstRate, hsn}
     = req.body;

    logInfo('Request to update milk category',name);

    const response = await db.execute(new UpdateMilkCategoryQuery(id,name,rate, taxable, gstRate, hsn));

    return respond(response,'Successfully Updated Milk Category', 'Failed to update Milk Category')
}

Route.withOutSecurity().noAuth().put('/milk-category/:id',post).bind();

