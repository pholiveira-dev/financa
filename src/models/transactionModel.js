const knex = require('../knex');

const TABLE_NAME = 'transactions';

class transactionModel {

    static async findIdTransaction(id) {
        return knex(TABLE_NAME).where({ transaction_id: id })
        .join('accounts', 'transactions.account_id', '=', 'accounts.account_id')
        .join('categories', 'transactions.category_id', '=', 'categories.categories_id')
        .select(
                'transactions.transaction_id',
                'transactions.descrição as descricao',
                'transactions.valor',
                'transactions.tipo',
                'transactions.data',
                'transactions.user_id',
                'transactions.category_id',
                'transactions.account_id',
                'accounts.nome as account_name',
                'categories.nome as category_name'
            )
        .where('transaction.user_id', user_id)
        .orderBy('transactions.data', 'desc')
        .first();

    }

    static async findAllWithNames(userId) {
        return knex(TABLE_NAME)
        .join('accounts', 'transactions.account_id', '=', 'accounts.account_id')
        .join('categories', 'transactions.category_id', '=', 'categories.categories_id')
        .select(
                'transactions.transaction_id',
                'transactions.descrição as descricao',
                'transactions.valor',
                'transactions.tipo',
                'transactions.user_id',
                'transactions.category_id',
                'transactions.account_id',
                'accounts.nome as account_name',
                'categories.nome as category_name'
            )
        .where('transactions.user_id', userId) // Filtra pelo ID do usuário
    }

    static async findFullEntry(user_id) {
        return knex(TABLE_NAME)
        .join('accounts', 'transactions.account_id', '=', 'accounts.account_id')
        .join('categories', 'transactions.category_id', '=', 'categories.categories_id')
        .select(
            'transactions.transaction_id',
                'transactions.descrição as descricao',
                'transactions.valor',
                'transactions.tipo',
                'transactions.user_id',
                'transactions.category_id',
                'transactions.account_id',
                'accounts.nome as account_name',
                'categories.nome as category_name')
        .where('transactions.user_id', user_id)
    }

    static async findTotalEntryValue(user_id) {
        return knex('transactions')
        .where('transactions.user_id', user_id)
        .andWhere('transactions.tipo', 'Entrada')
        .sum('transactions.valor as total_entradas')
        .first();
    }

    static async findAllTransactions() {
        return knex(TABLE_NAME).select('*');
    }

    static async deletedTransaction(id) {
        const [deleted] = await knex(TABLE_NAME)
        .where({ transaction_id: id })
        .del()
        .returning('*');
        return deleted;
    }

    static async updatedTransaction(id, dataTransactions) {
        const [updated] = await knex(TABLE_NAME)
        .where({ transaction_id: id })
        .update(dataTransactions)
        .returning('*');
        return updated;
    }

    static async createTransaction(dataTransactions) {
        const transactionToInsert = {
            descrição: dataTransactions.descricao,
            valor: dataTransactions.valor,
            tipo: dataTransactions.tipo,
            account_id: dataTransactions.account_id,
            category_id: dataTransactions.category_id,
            user_id: dataTransactions.user_id
        }
        const [newTransactions] = await knex(TABLE_NAME)
        .insert(transactionToInsert)
        .returning('*');
        return newTransactions;
    }
}

module.exports = transactionModel;