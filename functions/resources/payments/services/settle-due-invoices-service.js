const { logInfo } = require('lib/functional/logger');
const { whenResult , composeResult} = require('lib');
const R = require('ramda');
const uuid = require('uuid');
const Result = require('folktale/result');
const db = require('db/repository');
const GetUnpaidInvoicesOfCustomerQuery = require('../queries/get-unpaid-invoices-by-customer-id-query');
const UpdateInvoiceQuery = require('../../invoices/queries/update-invoice-query');
const GetPaidInvoicesOfCustomerQuery = require('../queries/get-paid-invoices-by-customer-id-query');

const updateInvoice = async(id, amountPaid, paymentStatus, paymentDate) => {
    return db.update(new UpdateInvoiceQuery(id, amountPaid, paymentStatus, paymentDate));
}

module.exports.perform = async ({ customerId, amountReceived }) => {
    return composeResult(
        async (invoices) => {
            const promises = [];
            let amountLeft = amountReceived;
            for (let i = 0; i < invoices.length; i++) {
                const invoice = invoices[i];
                if(invoice.total - invoice.amountPaid <= amountLeft){
                    amountLeft -= (invoice.total - invoice.amountPaid);
                    promises.push(updateInvoice(invoice.id, invoice.total, 'Full Payment', new Date()));
                }
                else{
                    if(amountLeft > 0){
                        promises.push(updateInvoice(invoice.id, invoice.amountPaid + amountLeft, 'Partial Payment', new Date()));
                        amountLeft = 0;
                    }
                }
            }
            const res = promises.length > 0 ? await Promise.all(promises) : [];
            return Result.Ok(res);
        },
        () => db.find(new GetUnpaidInvoicesOfCustomerQuery(customerId))
    )();
}


module.exports.doOpposite = async ({ customerId, amountReceived }) => {
    return composeResult(
        async (invoicesDb) => {
            const promises = [];
            let amountLeft = amountReceived;
            const invoices = [
                ...invoicesDb.filter(invoice => invoice.paymentStatus === 'Partial Payment'),
                ...invoicesDb.filter(invoice => invoice.paymentStatus === 'Full Payment')
            ];

            for (let i = 0; i < invoices.length; i++) {
                const invoice = invoices[i];
                if(invoice.amountPaid <= amountLeft){
                    amountLeft -= invoice.amountPaid;
                    promises.push(updateInvoice(invoice.id, 0, 'Not Paid', null));
                }
                else{
                    if(amountLeft > 0){
                        promises.push(updateInvoice(invoice.id, invoice.amountPaid - amountLeft, 'Partial Payment', new Date()));
                        amountLeft = 0;
                    }
                }
            }
            const res = promises.length > 0 ? await Promise.all(promises) : [];
            return Result.Ok(res);
        },
        () => db.find(new GetPaidInvoicesOfCustomerQuery(customerId))
    )();
}