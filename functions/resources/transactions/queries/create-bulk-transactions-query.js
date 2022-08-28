const { Transaction } = require("./../../../models");


module.exports = class CreateBulkTransactionQuery {
    constructor(transactions){
        this.details = {
            transactions
        }
    }

    get(){
        return Transaction.bulkCreate(this.details.transactions);
    }
}   