const express = require('express');
const { CreateTag, DeleteTag, UpdateTag } = require('../../controllers/product/tagController');
const router = express.Router();

router.post('/', CreateTag);
router.delete('/:id', DeleteTag);
router.put('/:id', UpdateTag);

module.exports = router;