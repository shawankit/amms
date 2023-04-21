const { MilkCategory } = require("../../../models");


module.exports = class CreateMilkCategoryQuery {
    constructor(id,name,rate,taxable, gstRate, hsn){
        this.details = {
            id,
            name,
            rate,
            taxable,
            gstRate, 
            hsn
        }
    }

    get(){
        return MilkCategory.create({...this.details})
    }
}   