const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetAInvoiceQuery = require('../queries/get-a-invoice-query');
const DeleteTransactionsQuery = require('../../transactions/queries/delete-transactions-query');
const DeleteInvoiceQuery = require('../queries/delete-invoice-query');

const post = async (req) => {
    const { } = req.body;

    logInfo('Request to delete invoices',{ });

    const { id } = req.params;

    const response = await composeResult(
        () => db.execute(new DeleteInvoiceQuery(id)),
        (invoiceData) => composeResult(
            async () => {
                const oldTransactions = invoiceData.milkCategory;
                const deleteIds = oldTransactions.map((tr) => tr.Transaction.id);
                console.log(deleteIds);
                return deleteIds.length > 0 ? db.execute(new DeleteTransactionsQuery(deleteIds)) : Result.Ok({})
            },
        )(),
        () => db.findOne(new GetAInvoiceQuery(id)),
    )();

    return respond(response,'Successfully Deleted invoices', 'Failed to delete invoices');
}

Route.withOutSecurity().noAuth().delete('/invoices/:id',post).bind();

