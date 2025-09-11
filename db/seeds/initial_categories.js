exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {nome: 'Netflix', tipo_gasto: 'Débito' },
    {nome: 'Protetor Labial', tipo_gasto: 'Débito'},
    {nome: 'Condomínio', tipo_gasto: 'Fixo'}
  ]);
};
