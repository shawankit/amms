const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const DeleteCategoryQuery = require('../queries/delete-category-query');
const DeleteStcokByCategoryIdQuery = require('../../stocks/queries/delete-stock-by-category-id');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete milk-category',{});

    const response = await composeResult(
        () => db.find(new DeleteCategoryQuery(id)),
        () => db.findOne(new DeleteStcokByCategoryIdQuery(id))
    )();

    return respond(response,'Successfully Deleted category', 'Failed to delete category')
}


Route.withOutSecurity().noAuth().delete('/milk-category/:id',get).bind();
