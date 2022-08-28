const { Invoice, Customer, Transaction } = require("../../../models");

module.exports = class GetAllInvoiceQuery {
    constructor(date){
        this.details = {}
    }

    get(){
        return Transaction.findAll({
            include: [
                {
                    model: Invoice,
                    as: 'customer'
                }
            ]
        });
    }
}