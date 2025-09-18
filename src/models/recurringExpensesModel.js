const knex = require('../knex');

const TABLE_NAME = 'recurring_expenses';

class recurringExpensesModel {

    static async findByIdRecurringExpenses(id) {
        return knex(TABLE_NAME).where({ id }).first();
    }

    static async findAllRecurringExpenses() {
        return knex(TABLE_NAME).select('*');
    }

    static async createRecurringExpenses(recurringExpensesData) {
        const [newRecurringExpenses] = await knex(TABLE_NAME)
        .insert(recurringExpensesData)
        .returning('*');
        return newRecurringExpenses;
    }

    static async updateRecurringExpenses(id, recurringExpensesData) {
        const [update] = await knex(TABLE_NAME)
        .where({ id })
        .update(recurringExpensesData)
        .returning('*');
        return update;
    }

    static async deleteRecurringExpenses(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ id })
        .del()
        .returning('*');
        return deleted;
    }
}

module.exports = recurringExpensesModel;