const { Invoice } = require("../../../models");


module.exports = class UpdateInvoiceQuery {
    constructor(id,amountPaid, paymentStatus, paymentDate){
        this.details = {
            id,
            amountPaid,
            paymentStatus,
            paymentDate
        }
    }

    async get(){
        const invoice = await Invoice.findOne({
            where: {
                id: this.details.id
            }
        });

        invoice.amountPaid = this.details.amountPaid;
        invoice.paymentStatus = this.details.paymentStatus;
        invoice.paymentDate = this.details.paymentDate;

        return invoice.save();
    }
}   