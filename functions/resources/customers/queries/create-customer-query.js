const { Customer } = require("./../../../models");


module.exports = class CreateCustomerQuery {
    constructor(id,name,type,mobile){
        this.details = {
            id,
            name,
            type,
            mobile
        }
    }

    get(){
        return Customer.create({...this.details})
    }
}   