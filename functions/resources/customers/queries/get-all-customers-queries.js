const { Customer } = require("../../../models");

module.exports = class GetAllCustomerQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Customer.findAll();
    }
}