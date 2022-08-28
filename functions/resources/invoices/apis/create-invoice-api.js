const Route = require('route');
const { logInfo } = require('lib/functional/logger');
const { respond , whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const CreateInvoiceQuery = require('../queries/create-invoice-query');
const CreateBulkTransactionQuery = require('../../transactions/queries/create-bulk-transactions-query');
const GetAInvoiceQuery = require('../queries/get-a-invoice-query');
const UpdateInvoiceConfigQuery = require('../queries/update-invoice-config-query');
const UpdateCustomerDueQuery = require('../../customers/queries/update-customer-due-query');

const getInvoiceNumber = (ic) => `${ic.prefix ? `${ic.prefix}/` : ''}${ic.number}${ic.suffix ? `/${ic.suffix}` : ''}`

const post = async (req) => {
    const { customerId , total, transactions }
     = req.body;

     console.log(customerId , total, transactions);
    logInfo('Request to create invoices',{ customerId , total, transactions });

    const invoiceId = uuid.v4();

    const response = await composeResult(
        () => db.findOne(new GetAInvoiceQuery(invoiceId)),
        () => db.update(new UpdateCustomerDueQuery(customerId, total)),
        () => db.create(new CreateBulkTransactionQuery(transactions.map((transaction) => ({ ...transaction, id: uuid.v4(), customerId, invoiceId })))),
        (ic) => db.execute(new CreateInvoiceQuery(invoiceId,getInvoiceNumber(ic),customerId, total)),
        () => db.execute(new UpdateInvoiceConfigQuery()),
    )();

    return respond(response,'Successfully Created invoices', 'Failed to create invoices');
}

Route.withOutSecurity().noAuth().post('/invoices',post).bind();

