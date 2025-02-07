const express = require('express');
const { CounterCreate, CounterUpdate, CounterDelete } = require('../../controllers/counterController.js');
const router = express.Router();

router.post('/', CounterCreate);
router.delete('/:id', CounterDelete);
router.put('/:id', CounterUpdate);


module.exports = router;