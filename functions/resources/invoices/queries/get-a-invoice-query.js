const { Invoice, MilkCategory,Customer } = require("../../../models");

module.exports = class GetAInvoiceQuery {
    constructor(id){
        this.details = {id}
    }

    get(){
        return Invoice.findOne({
            where: this.details,
            include: [
                {
                    model: MilkCategory,
                    as: 'milkCategory'
                },
                {
                    model: Customer,
                    as: 'customer'
                }
            ]
        });
    }
}