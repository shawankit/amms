const { Invoice } = require("./../../../models");


module.exports = class CreateInvoiceQuery {
    constructor(id,invoiceNo,customerId,total,invoiceDate, type){
        this.details = {
            id,
            invoiceNo,
            customerId,
            total,
            invoiceDate,
            type
        }
    }

    get(){
        return  Invoice.create({...this.details});
    }
}   