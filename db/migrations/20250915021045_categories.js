exports.up = function(knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('categories_id').primary();
    table.string('nome').notNullable();
    table.enu('tipo_gasto', ['Fixo', 'Crédito', 'Débito']).notNullable();
    table.timestamp('criado_em').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories');
};