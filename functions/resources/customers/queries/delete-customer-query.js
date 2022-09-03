const { Customer } = require('models');

module.exports = class DeleteCustomerQuery {
    constructor(customerId) {
        this.details = {
            customerId
        };
    }

    get() {
        return Customer.destroy({
            where: {
                id: this.details.customerId
            }
        });
    }
};
