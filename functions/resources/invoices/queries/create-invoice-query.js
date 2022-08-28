const { Invoice } = require("./../../../models");


module.exports = class CreateInvoiceQuery {
    constructor(id,invoiceNo,customerId,total){
        this.details = {
            id,
            invoiceNo,
            customerId,
            total
        }
    }

    get(){
        return  Invoice.create({...this.details});
    }
}   