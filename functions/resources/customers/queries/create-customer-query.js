const { Customer } = require("./../../../models");


module.exports = class CreateCustomerQuery {
    constructor(id,name,type,mobile, isVendor = false){
        this.details = {
            id,
            name,
            type,
            mobile,
            isVendor
        }
    }

    get(){
        return Customer.create({...this.details})
    }
}   