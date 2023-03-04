const { Invoice } = require('models');

module.exports = class DeleteInvoiceQuery {
    constructor(id) {
        this.details = { id };
    }

    get() {
        return Invoice.destroy({
            where: {
                id: this.details.id
            }
        });
    }
};
