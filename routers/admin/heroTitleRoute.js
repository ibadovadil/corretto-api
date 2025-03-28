const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { HeroTitleCreate, HeroTitleDelete, HeroTitleUpdate } = require('../../controllers/heroTitleController.js');
const router = express.Router();


router.post('/',upload.single("coverImage"),HeroTitleCreate)
router.put('/:id',upload.single("coverImage"),HeroTitleUpdate)
router.delete('/:id' , HeroTitleDelete)

module.exports = router;