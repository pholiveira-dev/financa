exports.up = function(knex) {
  return knex.schema.createTable('recurringExpenses', (table) => {
    table.increments('recurring_id').primary();

    // category_id (FK)
    table.integer('category_id').unsigned().notNullable();
    table.foreign('category_id').references('categories_id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE');

    // user_id (FK)
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');

    // account_id (FK)
    table.integer('account_id').unsigned().notNullable();
    table.foreign('account_id').references('account_id').inTable('accounts').onUpdate('CASCADE').onDelete('CASCADE');

    table.decimal('valor', 10, 2).notNullable();
    table.string('descricao');
    table.date('dia_vencimento');
    table.boolean('ativo')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('recurringExpenses');
};
