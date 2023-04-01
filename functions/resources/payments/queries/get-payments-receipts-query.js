const { PaymentReceipt, Customer } = require("../../../models");
const { Op } = require("sequelize");

module.exports = class GetPaymentReceiptsQuery {
    constructor(search, offset = 0, limit, filters = {}){
        this.details = { search, offset, limit, filters }
    }

    get(){
        const whereClause = {};
        if(this.details.filters?.customerId){
            whereClause.where = {
                customerId: this.details.filters.customerId
            }
        }
        
        const customerWhereClause = {};
        if(this.details.search){
            customerWhereClause.where = {
                name: {
                    [Op.iLike]: `%${this.details.search}%`
                }
            }
        }

        return PaymentReceipt.findAndCountAll({
            ...whereClause,
            offset: this.details.offset,
            limit: this.details.limit,
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                {
                    model: Customer,
                    as: 'customer',
                    attributes: ['id', 'name'],
                    ...customerWhereClause
                }
            ]
        });
    }
}   