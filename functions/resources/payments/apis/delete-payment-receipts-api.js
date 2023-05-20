const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond, composeResult } = require('lib');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetPaymentReceiptQuery = require('../queries/get-payment-receipt-query');
const DeletePaymentReceiptsQuery = require('../queries/delete-payments-receipts-query');
const UpdateCustomerDueQuery = require('../../customers/queries/update-customer-due-query');
const SettleDueInvoicesServices = require('../services/settle-due-invoices-service');


const get = async (req) => {

    const { id } = req.params;
    logInfo('Request to delete payment-receipts',{});

    const response = await composeResult(
        (payment) => {
            const remainingAmount = payment.amountReceived - payment.additionalDue;
            return composeResult(
                () => db.find(new DeletePaymentReceiptsQuery(id)),
                () => remainingAmount > 0 ? SettleDueInvoicesServices.doOpposite({ customerId : payment.customerId , amountReceived: remainingAmount}) : Result.Ok({}),
                () => db.update(new UpdateCustomerDueQuery(payment.customerId, remainingAmount, -1 * payment.additionalDue))
            )()
        },
        () => db.findOne(new GetPaymentReceiptQuery(id))
    )();

    return respond(response,'Successfully Deleted payment-receipts', 'Failed to delete payment-receipts');
}


Route.withOutSecurity().noAuth().delete('/payment-receipts/:id',get).bind();
 