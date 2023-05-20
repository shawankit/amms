const { PaymentReceipt } = require('models');

module.exports = class DeletePaymentReceiptsQuery {
    constructor(paymentId) {
        this.details = {
            paymentId
        };
    }

    get() {
        return PaymentReceipt.destroy({
            where: {
                id: this.details.paymentId
            }
        });
    }
};
 