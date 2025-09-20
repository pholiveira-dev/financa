const express = require('express');
const categoriesRoutes = express.Router();
const categoriesController = require('../controllers/categoriesController');

// GET todas as categorias
categoriesRoutes.get('/', categoriesController.getAllCategories);

// POST para criar uma nova categoria
categoriesRoutes.post('/', categoriesController.createCategory);

// PUT para atualizar uma categoria específica
categoriesRoutes.put('/:id', categoriesController.updateCategory);

// DELETE para uma categoria específica
categoriesRoutes.delete('/:id', categoriesController.deleteCategory);

module.exports = categoriesRoutes;