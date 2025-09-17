const userModel = require('../models/userModel');

// createUsers(userData)
async function postUser(req, res) {
    try {
    const { newUser } = req.body;

    await userModel.createUser(newUser);
    
    res.status(201).json(newUser)

    } catch (e) { 
        console.error(e);
        res.status(500).json("Erro ao criar usuário");
    }
}

// findAllUsers
async function getAllUsers(req, res) {
    try {
        const { users } = await userModel.findAllUsers();
        res.json( users );

    } catch (e) {
        console.error(e);
        res.status(500).send('Erro ao listar usuários');
    }
}

// findUser(id)
async function getUser(req, res) {
    try {
        const { id } = req.params;
        const user = await userModel.findUser(id);
        res.json( user );

    } catch (e) {
        console.error(e);
        res.status(500).send('Erro ao buscar o usuário.'); // Falta lançar uma mensagem para o usuário
    }
}

// updateUser(id, userData)
async function patchUser(req, res) {
    try {
        const { id } = req.params;
        const { userData } = req.body;

        const updated  = await userModel.updateUser(id, userData);

        res.json(updated);

    } catch (e) {
        console.error(e);
        res.status(400).send(''); // Precisa lançar a mensagem pro usuário
    }
}

// deleteUser(id)
async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        const { deleted } = await userModel.deleteUser(id);

        res.json(deleted);

    } catch (e) {
        console.error(e);
        res.status(404).send(''); // Precisa lançar a mensagem pro usuário
    }
}

module.exports = { postUser, getAllUsers, getUser, patchUser, deleteUser };
// As duas páginas foram criadas: login e cadastro do usuário - PENDENTE AUTENTICAÇÃO