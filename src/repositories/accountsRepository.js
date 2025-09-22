const accountsModel = require('../models/accountsModel');

class accountsRepository {
    static async findById(account_id, user_id) {
      
        return accountsModel.findById(account_id, user_id);
    }

    static async findAll(user_id) {
        return accountsModel.findAllByUserId(user_id);
    }

    static async create(accountData) {
        return accountsModel.create(accountData);
    }

    static async update(id, user_id, accountData) {
        return accountsModel.update(id, user_id, accountData);
    }

    static async delete(id, user_id) {
        return accountsModel.delete(id, user_id);
    }
}

module.exports = accountsRepository;