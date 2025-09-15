exports.up = function(knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('transaction_id').primary();
    // user_id (FK -> users)
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');

    // category_id (FK -> categories)
    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('categories_id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');

    // account_id  (FK -> accounts)
    table.integer('account_id').unsigned().notNullable();
    table.foreign('account_id').references('account_id').inTable('accounts').onDelete('CASCADE').onUpdate('CASCADE');
  
    table.enu('tipo', ['Entrada', 'Saída']).notNullable();
    table.decimal('valor', 10, 2).notNullable();
    table.string('descrição');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('transactions');
};
