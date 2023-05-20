const { PaymentReceipt, PaymentModeDetails } = require("../../../models");
const uuid = require('uuid');
module.exports = class CreatePaymentReceiptQuery {
    constructor(id,customerId,amountReceived, paymentMode, paymentModeDetails, additionalDue){
        this.details = {
            id,
            customerId,
            amountReceived,
            paymentMode,
            additionalDue
        }
        this.paymentModeDetails = paymentModeDetails;
    }

    async get(){
        let paymentModeDetailsId = null;
        if(this.details.paymentMode !== 'CASH'){
            const whereClause = this.details.paymentMode === 'UPI' ? { upiId : this.paymentModeDetails.upiId } : { cardNumber : this.paymentModeDetails.cardNumber };
            
            let paymentModeDetails = await PaymentModeDetails.findOne({ where : whereClause });

            if(!paymentModeDetails){
                paymentModeDetails = await PaymentModeDetails.create({
                    upiId: this.details.paymentMode === 'UPI' ? this.paymentModeDetails.upiId : null,
                    cardNumber: this.details.paymentMode !== 'UPI' ? this.paymentModeDetails.cardNumber : null,
                    cardHolderName: this.details.paymentMode !== 'UPI' ? this.paymentModeDetails.cardHolderName : null,
                    cardExpiry: this.details.paymentMode !== 'UPI' ? this.paymentModeDetails.cardExpiry : null,
                    id: uuid.v4(),
                    type: this.details.paymentMode,
                    customerId: this.details.customerId
                })
            }
            paymentModeDetailsId = paymentModeDetails.id;
        }
        return PaymentReceipt.create({...this.details, paymentModeDetailsId });
    }
}   