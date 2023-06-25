const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const UpdateCustomerQuery = require('../queries/update-customer-query');
const CreateBulkMilkCategoryQuery = require('../../milk-category/queries/create-bulk-milk-category-query');

const post = async (req) => {

    const { id } = req.params; 
    const { name , type, mobile , rates, isVendor}
     = req.body;

    logInfo('Request to update customer',name);

    const response = await composeResult(
        (customer) => R.ifElse(
            () => type === 'special',
            () => composeResult(
                () => Result.Ok(customer),
                () => db.execute(new CreateBulkMilkCategoryQuery(rates.map((rate) => ({...rate, customerId: id, id: rate.id === rate.categoryId ?  uuid.v4() :  rate.id }))))
            )(),
            () => Result.Ok(customer)
        )(),
        () => db.execute(new UpdateCustomerQuery(id,name,type, mobile, isVendor))
    )();

    return respond(response,'Successfully Updated Customer', 'Failed to update customer')
}

Route.withOutSecurity().noAuth().put('/customers/:id',post).bind();

