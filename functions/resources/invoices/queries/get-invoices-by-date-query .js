const { Invoice, MilkCategory, Customer , sequelize} = require("../../../models");
const { Op } = require("sequelize");
const moment = require('moment');

module.exports = class GetInvoicesByDateQuery {
    constructor(date){
        this.details = {date}
    }

    get(){
        return Customer.findAll({
            include: [
                {
                    model: Invoice,
                    as: 'invoices',
                    where: {
                        createdAt: {
                            [Op.gte]: moment(this.details.date).toDate(),
                            [Op.lt]: moment(this.details.date).add(24, 'h').toDate()
                        }
                    },
                    include: [
                        {
                            model: MilkCategory,
                            as: 'milkCategory'
                        }
                    ]
                }
            ]
        });
    }
}