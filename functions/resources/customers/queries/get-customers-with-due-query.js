const { Op } = require("sequelize");
const { Customer } = require("../../../models");

module.exports = class GetCustomersWithDueQuery {
    constructor(search, offset = 0, limit, isVendor = false){
        this.details = { search, offset, limit, isVendor }
    }

    get(){
        let condition = {
            where: {
                isVendor: this.details.isVendor,
            }
        };
        if (this.details.search) {
            condition.where = {
                ...condition.where,
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