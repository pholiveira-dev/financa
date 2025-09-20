const transactionModel = require('../models/transactionModel');

// findIdTransaction(id)
async function getTransaction(req, res) {
    try {
        const { id } = req.params;
        
        const findTransaction = await transactionModel.findIdTransaction(id);

        res.json(findTransaction);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // Falta tratar erro
    }
}

// findAllTransactions()
async function getAllTransactions(req, res) {
    try {
        
        const { user_id } = req.query;
        const allTransactions = await transactionModel.findAllWithNames(user_id); 
        res.status(200).json(allTransactions);

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro interno do servidor ao listar transações." });
    }
}


// deletedTransaction(id)
async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;

        const deleted = await transactionModel.deletedTransaction(id);

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
        const { tipo, valor, descricao, user_id, category_id, account_id } = req.body;
        
        const dataTransaction  = { tipo, valor, descricao, user_id, category_id, account_id };

        const updated = await transactionModel.updatedTransaction(id, dataTransaction);

        res.json(updated);

    } catch (e) {
        console.error(e);
        res.status(404).send('') // Falta tratar erro               
    }
}

// createTransaction(dataTransactions)
async function postTransaction(req, res) {
    try {
        const { tipo, valor, descricao, user_id, category_id, account_id } = req.body;
        
        const createTransaction = { tipo, valor, descricao, user_id, category_id, account_id };

        const newTransaction = await transactionModel.createTransaction(createTransaction);

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