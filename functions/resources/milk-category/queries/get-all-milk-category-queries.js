const { MilkCategory } = require("../../../models");
const { Op } = require("sequelize");

module.exports = class GetAllMilkCategoryQuery {
    constructor(customerId, search, offset, limit){
        this.details = {customerId, search, offset, limit}
    }

    get(){
        let condition = {
            customerId: this.details.customerId ? this.details.customerId : null
        };
        if (this.details.search) {
            condition = {
                ...condition,
                name: { [Op.iLike]: `%${this.details.search}%` }
            };
        }
        return MilkCategory.findAndCountAll({
            where: condition,
            include: [
                {
                    model: MilkCategory,
                    as: 'normal'
                }
            ],
            order: ['createdAt']
        });
    }
}