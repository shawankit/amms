const { PaymentReceipt } = require("../../../models");

module.exports = class GetPaymentReceiptQuery {
    constructor(id){
        this.details = { id }
    }

    get(){

        return PaymentReceipt.findOne({
            where: {
                id: this.details.id
            },
        });
    }
}   