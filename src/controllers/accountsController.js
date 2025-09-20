const accountModel = require('../models/accountsModel');

// findByIdAccount(id)
async function getAccount(req, res) {

    try {
        const { id } = req.params;
        const account = await accountModel.findByIdAccount(id);

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
        const { nome, tipo, limite, user_id } = req.body;

        const newAccount = { nome, tipo, limite, user_id };

        const createdAccount = await accountModel.createAccount(newAccount);

        res.json(createdAccount);
    } catch (e) {
        
    }
}

// updateAccount(id, accountData)
async function putAccount(req, res) {
    try {
        const { id } = req.params;
        const { nome, tipo, limite, user_id } = req.body;
        const updatedAccount = { nome, tipo, limite, user_id };

        const updated = await accountModel.updateAccount(id, updatedAccount);

        res.json(updated);

    } catch (error) {
        
    }
}

// deleteAccount(id)
async function deleteAccount(req, res) {
    try {
    const { id } = req.params;

    const deleted = await accountModel.deleteAccount(id);

    res.json(deleted);
    } catch (error) {
        
    }
}
module.exports = { getAccount, getAllAccounts, postAccount, putAccount, deleteAccount };