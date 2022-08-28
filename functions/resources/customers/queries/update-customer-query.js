const { Customer } = require("../../../models");


module.exports = class UpdateCustomerQuery {
    constructor(id,name,type,mobile){
        this.details = {
            id,
            name,
            type,
            mobile
        }
    }

    async get(){
        const customer = await Customer.findOne({
            where: {
                id: this.details.id
            }
        });

        customer.name = this.details.name;
        customer.type = this.details.type;
        customer.mobile = this.details.mobile;

        return customer.save();
    }
}   