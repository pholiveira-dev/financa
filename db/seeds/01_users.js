exports.seed = function(knex) {
  // Apaga todos os registros de usuários existentes
  return knex('users').del()
    .then(function () {
      // Insere registros de teste
      return knex('users').insert([
        {nome: 'João', email: 'joao@exemplo.com', senha: 'senha_segura'},
        {nome: 'Maria', email: 'maria@exemplo.com', senha: 'outra_senha_segura'},
      ]);
    });
};