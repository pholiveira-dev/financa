const knex = require('../knex');

const TABLE_NAME = 'user';

async function findUser(id) {
    return knex(TABLE_NAME).where({ id }).first();
}

async function findAllUsers() {
    return knex(TABLE_NAME).select('*');
}

async function createUser(userData) {
    const [newUser] = await knex(TABLE_NAME).insert(userData).returning('*');
    return newUser;
}

async function updateUser(id, userData) {
    const [update] = await knex(TABLE_NAME)
    .where({ id })
    .update(userData)
    .returning('*');
    return update;
}

async function deleteUser(id) {
    const [deleted] = await knex(TABLE_NAME)
    .where({ id })
    .del()
    .returning('*');
    return deleted;
}

module.exports = {
    findAllUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser
}