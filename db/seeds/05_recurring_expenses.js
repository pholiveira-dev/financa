exports.seed = function(knex) {
  return knex('recurringExpenses').del()
    .then(function () {
      return knex('recurringExpenses').insert([
        {
          user_id: 1,
          category_id: 1,
          account_id: 1,
          valor: 120.00,
          descricao: 'Mensalidade da academia',
          dia_vencimento: '2025-10-10',
          ativo: true,
        },
        {
          user_id: 2,
          category_id: 3,
          account_id: 2,
          valor: 45.00,
          descricao: 'Assinatura de streaming',
          dia_vencimento: '2025-10-25',
          ativo: true,
        },
      ]);
    });
};