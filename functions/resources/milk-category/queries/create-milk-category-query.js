const { MilkCategory } = require("../../../models");


module.exports = class CreateMilkCategoryQuery {
    constructor(id,name,rate,taxable, gstRate){
        this.details = {
            id,
            name,
            rate,
            taxable,
            gstRate
        }
    }

    get(){
        return MilkCategory.create({...this.details})
    }
}   