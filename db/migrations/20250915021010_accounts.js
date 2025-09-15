exports.up = function(knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.increments('account_id').primary();
    // FK user_id
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    
    table.string('nome').notNullable();
    table.enu('tipo', ['Nubank', 'Bradesco', 'Banco do Brasil', 'Caixa', 'Mercado Pago', 'C6', 'PicPay', 'Santander']);
    table.decimal('limite', 10, 2);
    table.date('criado_em').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('accounts');
};
