const { MilkCategory } = require("../../../models");


module.exports = class UpdateMilkCategoryQuery {
    constructor(id,name,rate, taxable,gstRate){
        this.details = {
            id,
            name,
            rate,
            taxable,
            gstRate
        }
    }

    async get(){
        const milkCategory = await MilkCategory.findOne({
            where: {
                id: this.details.id
            }
        });

        milkCategory.name = this.details.name;
        milkCategory.rate = this.details.rate;
        milkCategory.taxable = this.details.taxable;
        milkCategory.gstRate = this.details.gstRate;

        return milkCategory.save();
    }
}   