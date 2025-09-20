const express = require('express');
const accountRouter = express.Router();
const accountsController = require('../controllers/accountsController');

// GET todas as contas
accountRouter.get('/', accountsController.getAllAccounts);

// GET para uma conta específica
accountRouter.get('/:id', accountsController.getAccount);

// POST para criar uma conta
accountRouter.post('/', accountsController.postAccount);

// PUT para atualizar a conta
accountRouter.put('/:id', accountsController.putAccount);

// DELETE para uma conta
accountRouter.delete('/:id', accountsController.deleteAccount);

module.exports = accountRouter;