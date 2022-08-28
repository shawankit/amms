const { Invoice, Customer, Transaction } = require("../../../models");

module.exports = class GetAllInvoiceQuery {
    constructor(date){
        this.details = {}
    }

    get(){
        return Invoice.findAll({
            include: [
                {
                    model: Customer,
                    as: 'customer'
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
}