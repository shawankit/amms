const { Invoice } = require("../../../models");

module.exports = class GetUnpaidInvoicesOfCustomerQuery {
    constructor(customerId){
        this.details = {customerId}
    }

    get(){
        return Invoice.findAll({
            where: { 
                customerId: this.details.customerId,
                paymentStatus: ['Not Paid', 'Partial Payment']
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });
    }
}