const knex = require('../knex');

const TABLE_NAME = 'transactions';

class transactionModel {

    static async findIdTransaction(id) {
        return knex(TABLE_NAME).where({ transaction_id: id }).first();
    }

    static async findAllTransactions() {
        return knex(TABLE_NAME).select('*');
    }

    static async deletedTransaction(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ transaction_id: id })
        .del()
        .returning('*');
        return deleted;
    }

    static async updatedTransaction(id, dataTransactions) {
        const [updated] = await knex(TABLE_NAME)
        .where({ transaction_id: id })
        .update(dataTransactions)
        .returning('*');
        return updated;
    }

    static async createTransaction(dataTransactions) {
        const [newTransactions] = await knex(TABLE_NAME)
        .insert(dataTransactions)
        .returning('*');
        return newTransactions;
    }
}

module.exports = transactionModel;