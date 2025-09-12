const knex = require('../knex');

const TABLE_NAME = 'user';

class userModel {
    static async findUsers(id) {
        return knex(TABLE_NAME).where({ id }).first();
    }

    static async findAllUsers() {
        return knex(TABLE_NAME).select('*');
    }

    static async createUsers(userData) {
        const [newUser] = await knex(TABLE_NAME).insert(userData).returning('*');
        return newUser;
    }

    static async updateUsers(id, userData) {
    const [update] = await knex(TABLE_NAME)
    .where({ id })
    .update(userData)
    .returning('*');
    return update;
    }

    static async deleteUsers(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ id })
        .del()
        .returning('*');
        return deleted;
    }

}

module.exports = userModel;