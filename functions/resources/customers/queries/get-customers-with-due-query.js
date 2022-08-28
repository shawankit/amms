const { Op } = require("sequelize");
const { Customer } = require("../../../models");

module.exports = class GetCustomersWithDueQuery {
    constructor(){
        this.details = {}
    }

    get(){
        return Customer.findAll({
            order: [
                ['due', 'DESC']
            ]
        });
    }
}