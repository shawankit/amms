const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreatePaymentReceiptQuery = require('../queries/create-payment-receipt-query');
const UpdateCustomerDueQuery = require('../../customers/queries/update-customer-due-query');
const SettleDueInvoicesServices = require('../services/settle-due-invoices-service');

const post = async (req) => {
    const { amountReceived } = req.body;

    const { customerId } = req.params;

    logInfo('Request to create payment-receipt',{customerId , amountReceived});

    const id = uuid.v4();

    const response = await composeResult(
        () => SettleDueInvoicesServices.perform({ customerId , amountReceived}),
        () => db.update(new UpdateCustomerDueQuery(customerId, -amountReceived)),
        () => db.execute(new CreatePaymentReceiptQuery(id, customerId, amountReceived))
    )();

    return respond(response,'Successfully Created Payment Receipt', 'Failed to create Payment Receipt')
}

Route.withOutSecurity().noAuth().post('/customers/:customerId/payments',post).bind();

