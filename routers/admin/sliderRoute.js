const express = require('express');
const { SliderCreate, SliderDelete, SliderUpdate } = require('../../controllers/sliderController.js');
const upload = require('../../middlewares/uploadFile.js')
const router = express.Router();

router.post('/', upload.single("backgroundImage"), SliderCreate);
router.put('/:id' , upload.single("backgroundImage"),SliderUpdate)
router.delete('/:id',SliderDelete);



module.exports = router;