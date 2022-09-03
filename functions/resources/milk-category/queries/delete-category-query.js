const { MilkCategory } = require('models');

module.exports = class DeleteCategoryQuery {
    constructor(categoryId) {
        this.details = {
            categoryId
        };
    }

    get() {
        return MilkCategory.destroy({
            where: {
                id: this.details.categoryId
            }
        });
    }
};
