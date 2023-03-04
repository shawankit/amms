const { Customer } = require("../../../models");
const { Op } = require("sequelize");

module.exports = class GetAllCustomerQuery {
    constructor( search, offset = 0, limit ){
        this.details = {  search, offset, limit }
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
            order: [['createdAt', 'DESC']]
        });
    }
}