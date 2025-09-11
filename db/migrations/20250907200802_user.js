const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('user', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable().unique();
    table.string('senha').notNullable();
    table.timestamp('criado_em').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
