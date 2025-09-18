const express = require('express');
const transactionRoutes = express.Router();
const transactionController = require('../controllers/transactionController');

transactionRoutes.get('/', transactionController.getAllTransactions);

transactionRoutes.get('/:id', transactionController.getTransaction);

transactionRoutes.post('/', transactionController.postTransaction);

transactionRoutes.put('/:id', transactionController.putTransaction);

transactionRoutes.delete('/:id', transactionController.deleteTransaction);

module.exports = transactionRoutes;