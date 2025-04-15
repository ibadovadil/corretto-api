const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { HeroTitleCreate, HeroTitleDelete, HeroTitleUpdate } = require('../../controllers/heroTitleController.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const auth = require('../../middlewares/auth.js');
const router = express.Router();


router.post('/', auth, isAdmin, upload.single("coverImage"), HeroTitleCreate);
router.put('/:id', auth, isAdmin, upload.single("coverImage"), HeroTitleUpdate);
router.delete('/:id', auth, isAdmin, HeroTitleDelete);

module.exports = router;