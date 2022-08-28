const { Stock } = require("../../../models");


module.exports = class CreateBulkStocksQuery {
    constructor(stocks){
        this.details = {
            stocks
        }
    }

    get(){
        return Stock.bulkCreate(this.details.stocks, {
            updateOnDuplicate: ["morningQuantity", 'eveningQuantity'],
        });
    }
} 