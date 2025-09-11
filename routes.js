const express = require('express');
const router = express.Router();

const userController = require('./src/controllers/userController');
const knex = require('./src/knex');

// GET formulário de login
router.get('/login', (req, res) => {
    res.render('login');
});

// GET coração do sistema web
router.get('/', (req, res) => {
    res.render('dashboard');
})

// GET para cadastrar usuario
router.get('/create', (req, res) => {
    res.render('userRegistration')
})

// POST cria usuário
router.post('/create', userController.createUser);


// GET para listar usuários
router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;