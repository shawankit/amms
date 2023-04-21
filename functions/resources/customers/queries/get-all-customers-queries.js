const { Customer } = require("../../../models");
const { Op } = require("sequelize");

module.exports = class GetAllCustomerQuery {
    constructor( search, offset = 0, limit, isVendor = false ){
        this.details = {  search, offset, limit, isVendor }
    }

    get(){
        let condition = {
            isVendor: this.details.isVendor,
        };
        if (this.details.search) {
            condition = {
                ...condition,
                name: { [Op.iLike]: `%${this.details.search}%` }
            };
        }
        return Customer.findAndCountAll({
            where: condition,
            offset: this.details.offset,
            limit: this.details.limit,
            distinct: true,
            order: [['createdAt', 'DESC']]
        });
    }
}