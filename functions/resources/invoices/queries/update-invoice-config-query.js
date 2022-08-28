const { InvoiceConfig } = require("../../../models");


module.exports = class UpdateInvoiceConfigQuery {
    constructor(){
        this.details = {}
    }

    async get(){
        const ic = await InvoiceConfig.findOne();

        ic.number += 1;

        return ic.save();
    }
}   