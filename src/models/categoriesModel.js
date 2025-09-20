const knex = require('../knex');

const TABLE_NAME = 'categories';

class categoriesModel {

    static async findAllCategories() {
        return knex(TABLE_NAME).select('*');
    }

    static async createCategory(categoryData) {
        const [newCategory] = await knex(TABLE_NAME)
            .insert(categoryData)
            .returning('*');
        return newCategory;
    }

    static async updateCategory(id, categoryData) {
        const [updated] = await knex(TABLE_NAME)
            .where({ categories_id: id })
            .update(categoryData)
            .returning('*');
        return updated;
    }

    static async deleteCategory(id) {
        const [deleted] = await knex(TABLE_NAME)
            .where({ categories_id: id })
            .del()
            .returning('*');
        return deleted;
    }
}

module.exports = categoriesModel;