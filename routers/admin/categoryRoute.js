const express = require('express');
const { deleteCategory, updateCategory, createCategory } = require('../../controllers/product/categoryController');
const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/', auth, isAdmin, createCategory);
router.delete('/:id', auth, isAdmin, deleteCategory);
router.put('/:id', auth, isAdmin, updateCategory);


module.exports = router;