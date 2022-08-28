const { Op } = require("sequelize");
const moment = require('moment');
const { Stock, MilkCategory } = require("../../../models");

module.exports = class GetTodayStocksQuery {
    constructor(date){
        this.details = {date}
    }

    get(){
        const todaysDate = this.details.date ? this.details.date : moment().format('YYYY-MM-DD');
        return Stock.findAll({
            where: {
                createdAt: {
                    [Op.gte]: moment(todaysDate).toDate(),
                    [Op.lt]: moment(todaysDate).add(24, 'h').toDate()
                }
            },
            include: [
                {
                    model: MilkCategory,
                    as: 'milkCategory'
                }
            ]
        });
    }
}