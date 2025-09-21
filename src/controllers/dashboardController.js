// src/controllers/dashboardController.js

const knex = require('../knex'); // ou a sua conexão com o banco

async function getDashboardPage(req, res) {
    try {
        // Supondo que você tem o ID do usuário (isso viria da autenticação)
        const userId = 1; 

        // Busca os dados do banco de dados de forma assíncrona
        const user = await knex('users').where('id', userId).first();

        const accounts = await knex('accounts').where('user_id', userId);

        const categories = await knex('categories').select('*');

        // Se o usuário não for encontrado, retorne um erro
        if (!user) {
            return res.status(404).send('Usuário não encontrado.');
        }

        // Renderiza a página e passa os dados buscados para o EJS
        res.render('dashboard', { 
            userId: userId,
            user: user,
            accounts: accounts, 
            categories: categories 
        });

    } catch (e) {
        console.error(e);
        res.status(500).send('Erro ao carregar o dashboard.');
    }
}

module.exports = {
    getDashboardPage
};