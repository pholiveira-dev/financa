exports.seed = function(knex) {
  // Apaga todas as contas existentes
  return knex('accounts').del()
    .then(function () {
      // Insere registros de teste
      return knex('accounts').insert([
        {user_id: 1, nome: 'Conta Principal', tipo: 'Nubank', limite: 5000.00, criado_em: knex.fn.now()},
        {user_id: 2, nome: 'Conta Secundária', tipo: 'Bradesco', limite: 2000.00, criado_em: knex.fn.now()},
      ]);
    });
};