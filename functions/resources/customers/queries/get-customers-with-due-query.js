const { Op } = require("sequelize");
const { Customer } = require("../../../models");

module.exports = class GetCustomersWithDueQuery {
    constructor(search, offset = 0, limit){
        this.details = { search, offset, limit }
    }

    get(){
        let condition = {};
        if (this.details.search) {
            condition.where = {
                name: { [Op.iLike]: `%${this.details.search}%` }
            };
        }
        return Customer.findAndCountAll({
            ...condition,
            offset: this.details.offset,
            limit: this.details.limit,
            distinct: true,
            order: [
                ['due', 'DESC']
            ]
        });
    }
}