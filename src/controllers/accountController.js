const accountModel = require('../models/accountsModel');
const { deleteTransaction } = require('./transactionController');

// findByIdAccount(id)
async function getAccount(req, res) {

    try {
        const { id } = req.params;
        const account = await accountModel.findIdTransactions(id);

        res.json(account);
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ e: "Erro ao buscar usuário" })
    }
}

// findAllAccounts()
async function getAllAccounts(req, res) {
    try {
        const allAccounts = await accountModel.findAllAccounts();

        res.json(allAccounts);

    } catch (e) {
        
    }
}

// createAccounts(accountsData)
async function postAccount(req, res) {
    try {
        const { nome, tipo, limite, criado_em } = req.body;

        const newAccount = { nome, tipo, limite, criado_em };

        const createdAccount = await accountModel.createAccount(newAccount);

        res.json(createdAccount);
    } catch (e) {
        
    }
}

// updateAccount(id, accountData)
async function putAccount(req, res) {
    try {
        const { id } = req.params;
        const { nome, tipo, limite, criado_em } = req.body;
        const updatedAccount = { nome, tipo, limite, criado_em };

        const updated = await accountModel.updateAccount(id, updatedAccount);

        res.json(updated);

    } catch (error) {
        
    }
}

// deleteAccount(id)
async function deleteAccount(req, res) {
    const { id } = req.params;

    const deleted = await accountModel.deleteAccount(id);

    res.json(deleted);
}
module.exports = { getAccount, getAllAccounts, postAccount, putAccount, deleteTransaction };