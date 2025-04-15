const express = require('express');
const { SliderCreate, SliderDelete, SliderUpdate } = require('../../controllers/sliderController.js');
const upload = require('../../middlewares/uploadFile.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const auth = require('../../middlewares/auth.js');
const router = express.Router();

router.post('/', auth, isAdmin, upload.single("backgroundImage"), SliderCreate);
router.put('/:id', auth, isAdmin, upload.single("backgroundImage"), SliderUpdate);
router.delete('/:id', auth, isAdmin, SliderDelete);




module.exports = router;
