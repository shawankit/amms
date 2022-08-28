const { PaymentReceipt } = require("../../../models");


module.exports = class CreatePaymentReceiptQuery {
    constructor(id,customerId,amountReceived){
        this.details = {
            id,
            customerId,
            amountReceived
        }
    }

    get(){
        return PaymentReceipt.create({...this.details})
    }
}   