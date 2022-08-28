const { MilkCategory } = require("../../../models");


module.exports = class CreateBulkMilkCategoryQuery {
    constructor(rates){
        this.details = {
            rates
        }
    }

    get(){
        return MilkCategory.bulkCreate(this.details.rates, {
            updateOnDuplicate: ["name", 'rate'],
        });
    }
}   