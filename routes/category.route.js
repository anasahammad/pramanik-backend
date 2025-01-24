const express = require('express');
const { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } = require('../controllers/category.controller');
const router = express.Router();

// Category routes
router.post('/', createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;