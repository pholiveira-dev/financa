/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// #################### PRECISA DE AJUSTES!!!!!!!!!!!!
exports.up = function(knex) {
  return knex.schema.createTable('transaction', (table) => {
    table.increments('transaction_id').primary();
    table.integer('user_id').unsigned().references('id').inTable('user').notNullable().onDelete('CASCADE');
    table.integer('category_id').unsigned().references('categories').notNullable.onDelete('CASCADE');
    table.integer('account_id').unsigned().references('account').notNullable.onDelete('CASCADE')
    // user_id (FK -> users)
    // category_id (FK -> categories)
    // account_id  (FK -> accounts)
    table.enu('Tipo', ['Entrada', 'Saída']).notNullable();
    table.decimal('Valor', 10, 2).notNullable();
    table.string('Descrição');
    table.dateTime().notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
