const { Invoice, Customer, Transaction } = require("../../../models");
const { Op } = require("sequelize");

module.exports = class GetAllInvoiceQuery {
    constructor( search, offset = 0, limit){
        this.details = {  search, offset, limit }
    }

    get(){
        let condition = {};
        if (this.details.search) {
            condition.where = {
                name: { [Op.iLike]: `%${this.details.search}%` }
            };
        }
        return Invoice.findAndCountAll({
            offset: this.details.offset,
            limit: this.details.limit,
            distinct: true,
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    ...condition
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    }
}