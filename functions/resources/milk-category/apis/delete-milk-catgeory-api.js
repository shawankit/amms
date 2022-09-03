const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteCategoryQuery = require('../queries/delete-category-query');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete milk-category',{});

    const response = await db.find(new DeleteCategoryQuery(id));

    return respond(response,'Successfully Deleted category', 'Failed to delete category')
}


Route.withOutSecurity().noAuth().delete('/milk-category/:id',get).bind();
