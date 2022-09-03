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
const GetCustomerByIdQuery = require('../../customers/queries/get-customer-by-id-query');
const SettleDueInvoicesServices = require('../../payments/services/settle-due-invoices-service');
const CreateCustomerQuery = require('../../customers/queries/create-customer-query');

const getInvoiceNumber = (ic) => `${ic.prefix ? `${ic.prefix}/` : ''}${ic.number}${ic.suffix ? `/${ic.suffix}` : ''}`

const post = async (req) => {
    const { customerId , total, transactions, invoiceDate, existingUser }
     = req.body;

    logInfo('Request to create invoices',{ customerId , total, transactions, invoiceDate });

    const invoiceId = uuid.v4();

    const OriginalCustomerId = !existingUser ? uuid.v4() : customerId;

    const response = await composeResult(
        () => db.findOne(new GetAInvoiceQuery(invoiceId)),
        () => db.update(new UpdateCustomerDueQuery(OriginalCustomerId, total)),
        (customer) => customer.due < 0 ? SettleDueInvoicesServices.perform({ OriginalCustomerId , amountReceived: -1 * customer.due}) : Result.Ok({}), 
        () => db.execute(new GetCustomerByIdQuery(OriginalCustomerId)),
        () => db.create(new CreateBulkTransactionQuery(transactions.map((transaction) => ({ ...transaction, id: uuid.v4(), OriginalCustomerId, invoiceId })))),
        (ic) => db.execute(new CreateInvoiceQuery(invoiceId,getInvoiceNumber(ic),OriginalCustomerId, total, invoiceDate)),
        () => db.execute(new UpdateInvoiceConfigQuery()),
        async () => !existingUser ? db.execute(new CreateCustomerQuery(OriginalCustomerId, customerId,'normal', '')) : Result.Ok({})
    )();

    return respond(response,'Successfully Created invoices', 'Failed to create invoices');
}

Route.withOutSecurity().noAuth().post('/invoices',post).bind();

