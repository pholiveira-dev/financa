const userModel = require('../models/userModel');

async function createUser(req, res) {
    try {
    const {nome, email, senha} = req.body;
    const userData = {
        nome, email, senha
    }

    await userModel.createUser(userData);
    
    res.redirect('/login')

    } catch (e) {
        console.error(e);
        res.status(500).json("Erro ao criar usuário")
    }
}

async function listUsers(req, res) {
    try {
        const users = await userModel.findAllUsers();
        res.render('users', { users });
    } catch (e) {
        console.error(e);
        res.status(500).send('Erro ao listar usuários')
    }
}

module.exports = { createUser, listUsers };

// As duas páginas foram criadas: login e cadastro do usuário - PENDENTE AUTENTICAÇÃO
// O próximo passo pode ser criar o restante do BD e consequentemente, as demais páginas