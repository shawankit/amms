const { MilkCategory } = require("../../../models");

module.exports = class GetAllMilkCategoryQuery {
    constructor(customerId){
        this.details = {customerId}
    }

    get(){
        return MilkCategory.findAll({
            where: {
                customerId: this.details.customerId ? this.details.customerId : null
            },
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