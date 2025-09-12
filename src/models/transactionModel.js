const knex = require('../knex');

const TABLE_NAME = 'transactions';

class transactionModel {

    static async findIdTransactions(id) {
        return knex(TABLE_NAME).where({ id }).first;
    }

    static async findAllTransactions() {
        return knex(TABLE_NAME).select('*');
    }

    static async deletedTransactions(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ id })
        .del()
        .returning('*');
        return deleted;
    }

    static async updatedTransactions(id, dataTransactions) {
        const [updated] = await knex(TABLE_NAME)
        .where({ id })
        .update(dataTransactions)
        .returning('*');
        return updated;
    }

    static async createTransactions(id, dataTransactions) {
        const [newTransactions] = await knex(TABLE_NAME)
        .insert(dataTransactions)
        .returning('*');
        return newTransactions;
    }
}

module.exports = transactionModel;