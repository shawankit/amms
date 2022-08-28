const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateCustomerQuery = require('../queries/create-customer-query');
const CreateBulkMilkCategoryQuery = require('../../milk-category/queries/create-bulk-milk-category-query');

const post = async (req) => {
    const { name , type, mobile, rates}
     = req.body;

    logInfo('Request to create customer',name);

    const id = uuid.v4();

    const response = await composeResult(
        (customer) => R.ifElse(
            () => type === 'special',
            () => composeResult(
                () => Result.Ok(customer),
                () => db.execute(new CreateBulkMilkCategoryQuery(rates.map((rate) => ({...rate, customerId: id, id: uuid.v4()}))))
            )(),
            () => Result.Ok(customer)
        )(),
        () => db.execute(new CreateCustomerQuery(id,name,type, mobile))
    )();

    return respond(response,'Successfully Created Customer', 'Failed to create customer')
}

Route.withOutSecurity().noAuth().post('/customers',post).bind();

