const express = require('express');
const mainRoutes = express.Router();
const dashboardController = require('../controllers/dashboardController');

// A rota agora chama a função do controller, que lida com a lógica
mainRoutes.get('/dashboard', dashboardController.getDashboardPage);

module.exports = mainRoutes;