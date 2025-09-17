const knex = require('../knex');

const TABLE_NAME = 'accounts';

class accountsModel {
    static async findByIdAccount(id) {
        return knex(TABLE_NAME).where({ id }).first();
    }

    static async findAllAccounts() {
        return knex(TABLE_NAME).select('*');
    }

    static async createAccount(accountData) {
        const [newAccount] = await knex(TABLE_NAME)
        .insert(accountData)
        .returning('*');
        return newAccount;
    }

    static async updateAccount(id, accountData) {
        const [update] = await knex(TABLE_NAME)
        .where({ id })
        .update(accountData)
        .returning('*');
        return update;
    }

    static async deleteAccount(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ id })
        .del()
        .returning('*');
        return deleted;
    }
}

module.exports = accountsModel;