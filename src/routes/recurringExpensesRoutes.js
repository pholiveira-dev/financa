const express = require('express');
const recurringExpensesRoutes = express.Router();
const recurringExpensesController = require('../controllers/recurringExpensesController');

recurringExpensesRoutes.get('/', recurringExpensesController.getAllRecurringExpenses);

recurringExpensesRoutes.get('/:id', recurringExpensesController.getRecurringExpenses);

recurringExpensesRoutes.post('/', recurringExpensesController.postRecurringExpenses);

recurringExpensesRoutes.put('/:id', recurringExpensesController.putRecurringExpenses);

recurringExpensesRoutes.delete('/:id', recurringExpensesController.deleteRecurringExpenses);

module.exports = recurringExpensesRoutes;