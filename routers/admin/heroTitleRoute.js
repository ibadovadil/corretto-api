const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { HeroTitleCreate, HeroTitleDelete, HeroTitleUpdate } = require('../../controllers/heroTitleController.js');
const router = express.Router();


router.post('/',upload.single("image"),HeroTitleCreate)
router.put('/:id',upload.single("image"),HeroTitleUpdate)
router.delete('/:id' , HeroTitleDelete)

module.exports = router;