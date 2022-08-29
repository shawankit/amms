const { Invoice } = require("./../../../models");


module.exports = class CreateInvoiceQuery {
    constructor(id,invoiceNo,customerId,total,invoiceDate){
        this.details = {
            id,
            invoiceNo,
            customerId,
            total,
            invoiceDate
        }
    }

    get(){
        return  Invoice.create({...this.details});
    }
}   