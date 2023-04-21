const { Customer } = require("../../../models");


module.exports = class UpdateCustomerQuery {
    constructor(id,name,type,mobile, isVendor = false){
        this.details = {
            id,
            name,
            type,
            mobile,
            isVendor
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
        customer.isVendor = this.details.isVendor;

        return customer.save();
    }
}   