const express = require('express');
const { CreateTag, DeleteTag, UpdateTag } = require('../../controllers/product/tagController');
const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.post('/', auth, isAdmin, CreateTag);
router.delete('/:id', auth, isAdmin, DeleteTag);
router.put('/:id', auth, isAdmin, UpdateTag);


module.exports = router;