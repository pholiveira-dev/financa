const express = require('express');
const transactionRoutes = express.Router();
const transactionController = require('../controllers/transactionController');

transactionRoutes.get('/', transactionController.getAllTransactions);

transactionRoutes.get('/:id', transactionController.getTransaction);

transactionRoutes.get('/total-entradas/:user_id', transactionController.getSumFullEntry);

transactionRoutes.post('/', transactionController.postTransaction);

transactionRoutes.put('/:id', transactionController.putTransaction);

transactionRoutes.delete('/:id', transactionController.deleteTransaction);

module.exports = transactionRoutes;