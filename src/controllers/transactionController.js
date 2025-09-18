const transactionModel = require('../models/transactionModel');

// findIdTransaction(id)
async function getTransaction(req, res) {
    try {
        const { id } = req.params;
        
        const findTransaction = await transactionModel.findAllTransactions(id);

        res.json(findTransaction);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // Falta tratar erro
    }
}

// findAllTransactions()
async function getAllTransactions(req, res) {
    try {
        const { allTransictions } = await transactionModel.findAllTransactions();

        res.json(allTransictions);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // Falta tratar erro
    }
}

// deletedTransaction(id)
async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;

        const { deleted } = await transactionModel(id);

        res.json(deleted);

    } catch (error) {
        console.error(e);
        res.status(404).send('') // Falta tratar erro        
    }
}

// updatedTransaction(id, dataTransactions)
async function putTransaction(req, res) {
    try {
        const { id } = req.params;
        const { dataTransaction } = req.body;

        const { updated } = await transactionModel.updatedTransaction(id, dataTransaction);

        res.json(updated);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // Falta tratar erro               
    }
}

// createTransaction(dataTransactions)
async function postTransaction(req, res) {
    try {
        const { dataTransaction } = req.body
        const { newTransaction } = await transactionModel.createTransaction(dataTransaction);

        res.json(newTransaction);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // falta tratar o erro
    }
}

module.exports = { 
    getTransaction, 
    getAllTransactions, 
    deleteTransaction,
    putTransaction,
    postTransaction
};