const express = require('express');
const { deleteCategory, updateCategory, createCategory } = require('../../controllers/product/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

module.exports = router;