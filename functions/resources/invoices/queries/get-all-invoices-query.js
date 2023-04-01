const { Invoice, Customer, Transaction } = require("../../../models");
const { Op } = require("sequelize");

module.exports = class GetAllInvoiceQuery {
    constructor( search, offset = 0, limit, type){
        this.details = {  search, offset, limit, type }
    }

    get(){
        let condition = {
            type: this.details.type
        };
        if (this.details.search) {
            condition = {
                ...condition,
                name: { [Op.iLike]: `%${this.details.search}%` }
            };
        }
        return Invoice.findAndCountAll({
            where: condition,
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