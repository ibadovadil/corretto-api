const express = require('express');
const { CounterCreate, CounterUpdate, CounterDelete } = require('../../controllers/counterController.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const auth = require('../../middlewares/auth.js');
const router = express.Router();
router.post('/', auth, isAdmin, CounterCreate);
router.delete('/:id', auth, isAdmin, CounterDelete);
router.put('/:id', auth, isAdmin, CounterUpdate);



module.exports = router;