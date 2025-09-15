exports.seed = function(knex) {
  // Apaga todas as categorias existentes
  return knex('categories').del()
    .then(function () {
      // Insere registros de teste
      return knex('categories').insert([
        {nome: 'Alimentação', tipo_gasto: 'Fixo'},
        {nome: 'Transporte', tipo_gasto: 'Débito'},
        {nome: 'Entretenimento', tipo_gasto: 'Crédito'},
      ]);
    });
};