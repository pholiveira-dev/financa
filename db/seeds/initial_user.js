exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del()
  await knex('user').insert([
    {nome: 'Pedro Henrique', email: 'pedrohen1001@hotmail.com', senha: '123456'},
    {nome: 'Gabriela de França Costa', email: 'gabrielaunb21@gmail.com', senha: '654321'},
    {nome: 'Artur de França Oliveira', email: 'arturf123@hotmail.com', senha: '123456'}
  ]);
};