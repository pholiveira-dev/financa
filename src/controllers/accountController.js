const e = require('express');
const transactionModel = require('../models/transactionModel');

async function getByIdAccounts(req, res) {

    try {
        const { id } = req.params;
        const transaction = await transactionModel.findIdTransactions(id);

        res.render('dashboard', { transaction });
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ e: "Erro ao buscar usuário" })
    }
}


module.exports = { getByIdAccounts };