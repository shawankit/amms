const { Invoice } = require("../../../models");

module.exports = class GetPaidInvoicesOfCustomerQuery {
    constructor(customerId){
        this.details = {customerId}
    }

    get(){
        return Invoice.findAll({
            where: { 
                customerId: this.details.customerId,
                paymentStatus: ['Full Payment', 'Partial Payment']
            },
            order: [
                ['createdAt', 'ASC']
            ],
        });
    }
}