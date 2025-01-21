const express = require('express');
const { SliderListItem, SliderGetById } = require('../../controllers/sliderController.js');
const router = express.Router();

router.get('/slider',SliderListItem);
router.get('/slider/:id',SliderGetById);


module.exports = router;