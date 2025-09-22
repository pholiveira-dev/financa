const { update } = require('../knex');
const accountsRepository = require('../repositories/accountsRepository');

// findById(id, user_id)
async function getAccount(req, res) {

    try {
        const { id } = req.params;
        const { user_id } = req.query;

        if(!id) {
            return res.status(400).json({ error: 'ID da conta não encontrado' });
        }

        if (!user_id) {
            return res.status(400).json({ error: 'ID do usuário não fornecido.' });
        }

        const account = await accountsRepository.findById(id, user_id);

        res.json(account);
        
    } catch (e) {
        console.error(e);
        res.status(500).json({ e: "Erro ao buscar a conta" })
    }
}

// findAllByUserId(user_id)
async function getAllAccounts(req, res) {
    try {

        const { user_id } = req.query;

        if(!user_id) {
            return res.status(400).json({ error: 'ID do usuário não fornecido.' })
        }

        const allAccounts = await accountsRepository.findAll(user_id);

        res.json(allAccounts);

    } catch (e) {
        console.error(e);
        res.status(500).json({ e: "Erro ao buscar as contas" })
    }
}

// createAccounts(accountsData)
async function postAccount(req, res) {
    try {
        const { user_id } = req.query;
        const { nome, tipo, limite } = req.body;   

        if(!user_id) {
            return res.status(400).json({ error: 'ID do usuário não encontrado.' })
        }

        if(!nome || !tipo || !limite) {
            return res.status(400).json({error: 'Nome, tipo e limite são campos obrigatórios.'})
        }

        const accountsData = { user_id, nome, tipo, limite };

        
        const createAccount = await accountsRepository.create(accountsData);

        res.status(201).json(createAccount);

    } catch (e) {
        console.error(e);
        res.status(500).json({e: 'Erro ao criar a conta.'})
    }
}

// update(id, user_id, accountData)
async function putAccount(req, res) {
    try {
        const { id } = req.params;
        const { user_id } = req.query;
        const { nome, tipo, limite } = req.body;

        if(!id) {
            return res.status(400).json({ error: 'ID da conta não encontrado' });
        }        

        if (!user_id) {
            return res.status(400).json({ error: 'ID do usuário não fornecido.' })
        }

        if (!nome && !tipo && !limite) {
            return res.status(400).json({ 
                error: 'Pelo menos um campo (nome, tipo, ou limite) deve ser fornecido para a atualização.'
            });
        }        

        const accountData = { };

        if (nome) accountData.nome = nome;
        if(tipo) accountData.tipo = tipo;
        if(limite) accountData.limite = limite;

        const updatedAccount = await accountsRepository.update(id, user_id, accountData);

        if (!updatedAccount) {
            return res.status(404).json({ error: 'Conta não encontrada ou não pertence a esse usuário.' })
        }

        res.status(200).json(updatedAccount);

    } catch (e) {
        console.error(e);
        res.status(500).json({ e: 'Erro ao criar a conta' })
    }
}
// deleteAccount(id)
async function deletedAccount(req, res) {
    try {
    const { id } = req.params;
    const { user_id } = req.query;

    if(!id) {
        return res.status(400).json({ error: 'ID da conta não encontrado' });
    }

    if(!user_id) {
        return res.status(400).json({ error: 'ID do usuário não encontrado.' });
    }

    const deleteAccount = await accountsRepository.delete(id, user_id);

    if(!deleteAccount) {
        res.status(404).json({ error: 'Conta não encontrada ou não pertence ao usuário' });
    }

    res.status(204).json();

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Não foi possível apagar a conta' })
    }
}
module.exports = { getAccount, getAllAccounts, postAccount, putAccount, deletedAccount };