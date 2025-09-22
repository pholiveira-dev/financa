const knex = require('../knex');

const TABLE_NAME = 'accounts';

class accountsModel {
    static async findById(id, user_id) {
        return knex(TABLE_NAME).where({ account_id: id, user_id }).first();
    }

    static async findAllByUserId(user_id) {
        return knex(TABLE_NAME)
        .where({ user_id })
        .select('*');
    }

    static async create(accountData) {
        const [newAccount] = await knex(TABLE_NAME)
        .insert(accountData)
        .returning('*');
        return newAccount;
    }

    static async update(id, user_id, accountData) {
        const [update] = await knex(TABLE_NAME)
        .where({ account_id: id, user_id })
        .update(accountData)
        .returning('*');
        return update;
    }

    static async delete(id, user_id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ account_id: id, user_id: user_id })
        .del()
        .returning('*');
        return deleted;
    }
}

module.exports = accountsModel;