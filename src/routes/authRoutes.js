const express = require('express');
const authRoutes = express.Router();

const userController = require('../controllers/userController');

// ####################### CADASTRO DO USUÁRIO - USER REGISTRATION #######################

// Exibir a página de login
authRoutes.get('/create', (req, res) => {
    res.render('userRegistration');
})


// GET para exibir a página de cadastro
authRoutes.get('/register', (req, res) => {
    res.render('userRegistration');
})

// POST para processar o formulário de cadastro
authRoutes.post('/create', userController.postUser);

// ####################### ACESSAR DADOS DO USUÁRIO - LOGIN #######################

authRoutes.get('/login', (req, res) => {
    res.render('login');
})

// POST para processar o formulário de login (LÓGICA PENDENTE)

module.exports = authRoutes;