const { Customer } = require("../../../models");


module.exports = class UpdateCustomerDueQuery {
    constructor(id,due, previousDue){
        this.details = {
            id,
            due,
            previousDue
        }
    }

    async get(){
        const customer = await Customer.findOne({
            where: {
                id: this.details.id
            }
        });

        customer.due += this.details.due;

        if(this.details.previousDue) {
            customer.previousDue += this.details.previousDue;
        }

        return customer.save();
    }
}   