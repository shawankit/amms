const { Stock } = require('models');

module.exports = class DeleteStcokByCategoryIdQuery {
    constructor(categoryId) {
        this.details = {
            categoryId
        };
    }

    get() {
        return Stock.destroy({
            where: {
                categoryId: this.details.categoryId
            }
        });
    }
};
