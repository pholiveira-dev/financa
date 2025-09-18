const recurringExpensesModel = require('../models/recurringExpensesModel');

// findByIdRecurringExpenses(id)
async function getRecurringExpenses(req, res) {
    try {
        const { id } = req.params;
        const { recurringExpenses } = await recurringExpensesModel.findByIdRecurringExpenses();

        res.json(recurringExpenses);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // Falta tratar o erro
    }
}

// findAllRecurringExpenses()
async function getAllRecurringExpenses(req, res) {
    try {
        const { allRecurringExpenses } = await recurringExpensesModel.findAllRecurringExpenses();

        res.json(allRecurringExpenses);

    } catch (error) {
        console.error(e);
        res.status(404).send('') // Falta tratar o erro        
    }
}

// createRecurringExpenses(recurringExpensesData)
async function postRecurringExpenses(req, res) {
    try {
        const { recurringExpensesData } = req.body;
        const { newRecurringExpenses } = await recurringExpensesModel.createRecurringExpenses(recurringExpensesData);

        res.json(newRecurringExpenses);

    } catch (error) {
        console.error(e);
        res.status(404).send('') // Falta tratar o erro                
    }
}

// updateRecurringExpenses(id, recurringExpensesData)
async function putRecurringExpenses(req, res) {
    try {
        const { id } = req.params;
        const { recurringExpensesData } = req.body;

        const { updated } = await recurringExpensesModel.updateRecurringExpenses(id, recurringExpensesData);

        res.json(updated);

    } catch (error) {
        console.error(e);
        res.status(404).send('') // Falta tratar o erro           
    }
}

// deleteRecurringExpenses(id)
async function deletedRecurringExpenses(req, res) {
    try {
        const { id } = req.params;

        const { deleted } = await recurringExpensesModel.deleteRecurringExpenses(id);

        res.json(deleted);

    } catch (error) {
        console.error(e);
        res.status(404).send('') // Falta tratar o erro                
    }
}

module.exports = {
    getRecurringExpenses,
    getAllRecurringExpenses,
    postRecurringExpenses,
    putRecurringExpenses,
    deletedRecurringExpenses
}