const { Invoice, MilkCategory } = require("../../../models");

module.exports = class GetAllInvoiceOfCustomerQuery {
    constructor(customerId){
        this.details = {customerId}
    }

    get(){
        return Invoice.findAll({
            where: this.details,
            include: [
                {
                    model: MilkCategory,
                    as: 'milkCategory'
                }
            ]
        });
    }
}