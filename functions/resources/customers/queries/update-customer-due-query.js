const { Customer } = require("../../../models");


module.exports = class UpdateCustomerDueQuery {
    constructor(id,due){
        this.details = {
            id,
            due
        }
    }

    async get(){
        const customer = await Customer.findOne({
            where: {
                id: this.details.id
            }
        });

        customer.due += this.details.due;

        return customer.save();
    }
}   