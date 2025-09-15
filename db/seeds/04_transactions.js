exports.seed = function(knex) {
  return knex('transactions').del()
    .then(function () {
      return knex('transactions').insert([
        {
          user_id: 1, 
          category_id: 1, 
          account_id: 1, 
          tipo: 'Saída', 
          valor: 50.75, 
          descrição: 'Compra de mercado', 
          // Adicione a data da transação se você tiver uma coluna
        },
        {
          user_id: 2, 
          category_id: 2, 
          account_id: 2, 
          tipo: 'Entrada', 
          valor: 1500.00, 
          descrição: 'Salário', 
          // Adicione a data da transação
        },
      ]);
    });
};