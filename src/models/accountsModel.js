const knex = require('../knex');

const TABLE_NAME = 'accounts';

class accountsModel {
    static async findByIdAccounts(id) {
        return knex(TABLE_NAME).where({ id }).first();
    }

    static async findAllAccounts() {
        return knex(TABLE_NAME).select('*');
    }

    static async createAccounts(accountsData) {
        const [newAccount] = await knex(TABLE_NAME)
        .insert(accountsData)
        .returning('*');
        return newAccount;
    }

    static async updateAccounts(id, accountsData) {
        const [update] = await knex(TABLE_NAME)
        .where({ id })
        .update(accountsData)
        .returning('*');
        return update;
    }

    static async deleteAccounts(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ id })
        .del()
        .returning('*');
        return deleted;
    }
}

module.exports = accountsModel;