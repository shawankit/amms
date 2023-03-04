const { MilkCategory } = require('models');

module.exports = class DeleteCategoryQuery {
    constructor(categoryId) {
        this.details = {
            categoryId
        };
    }

    async get() {
        const deleted = await MilkCategory.destroy({
            where: {
                categoryId: this.details.categoryId
            }
        });
        return MilkCategory.destroy({
            where: {
                id: this.details.categoryId
            }
        });
    }
};
