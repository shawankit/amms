const { Transaction } = require('models');

module.exports = class DeleteTransactionsQuery {
    constructor(ids) {
        this.details = { ids };
    }

    async get() {
        const ss = await Transaction.destroy({
            where: {
                id: this.details.ids
            }
        });
        console.log(ss);
        return ss;
    }
};
