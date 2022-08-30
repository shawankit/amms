const { Customer } = require("../../../models");


module.exports = class GetCustomerByIdQuery {
    constructor(id){
        this.details = {
            id
        }
    }

    async get(){
        const customer = await Customer.findOne({
            where: {
                id: this.details.id
            }
        });

        return customer;
    }
}   