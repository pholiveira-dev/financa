const accountModel = require('../models/accountsModel');

// findByIdAccount(id)
async function getAccount(req, res) {

    try {
        const { id } = req.params;
        const { user } = await accountModel.findIdTransactions(id);

        res.render('dashboard', { user });
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ e: "Erro ao buscar usuário" })
    }
}

// findAllAccounts()
async function getAllAccounts(req, res) {
    try {
        const { account } = await accountModel.findAllAccounts();

        res.json(account);

    } catch (e) {
        
    }
}

// createAccounts(accountsData)
async function postAccount(req, res) {
    try {
        const { accountsData } = req.body;

        const { newAccount } = await accountModel.createAccount(accountsData);

        res.json(newAccount);
    } catch (e) {
        
    }
}

// updateAccount(id, accountData)
async function putAccount(req, res) {
    try {
        const { id } = req.params;
        const { accountData } = req.body;

        const updated = await accountModel.updateAccount(id, accountData);

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
module.exports = { getAccount, getAllAccounts, postAccount, putAccount };