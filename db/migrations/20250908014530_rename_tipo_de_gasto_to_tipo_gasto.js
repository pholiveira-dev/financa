
exports.up = function(knex) {
  return knex.schema.table('categories', table => {
    table.renameColumn('Tipo de gasto', 'tipo_gasto');
  })
};


exports.down = function(knex) {
  return knex.schema.table('categories', table => {
    table.renameColumn('tipo_gasto', 'Tipo de gasto')
  })
};
