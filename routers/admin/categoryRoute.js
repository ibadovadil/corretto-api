const express = require('express');
const { createCategory, deleteCategory, updateCategory } = require('../../controllers/categoryController');
const router = express.Router();

router.post('/', createCategory);
router.delete('/:id', deleteCategory);
router.put('/:id', updateCategory);

module.exports = router;