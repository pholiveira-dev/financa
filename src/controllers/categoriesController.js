const categoriesModel = require('../models/categoriesModel');

async function getAllCategories(req, res) {
    try {
        const categories = await categoriesModel.findAllCategories();
        res.status(200).json(categories);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro ao listar categorias." });
    }
}

async function createCategory(req, res) {
    try {
        const newCategory = await categoriesModel.createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro interno do servidor ao criar categoria." });
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const updated = await categoriesModel.updateCategory(id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Categoria não encontrada para atualização." });
        }
        res.status(200).json(updated);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro interno do servidor ao atualizar categoria." });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;
        const deleted = await categoriesModel.deleteCategory(id);
        if (deleted.length === 0) {
            return res.status(404).json({ message: "Categoria não encontrada para exclusão." });
        }
        res.status(200).json({ message: "Categoria excluída com sucesso." });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Erro interno do servidor ao excluir categoria." });
    }
}

module.exports = { 
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory 
};