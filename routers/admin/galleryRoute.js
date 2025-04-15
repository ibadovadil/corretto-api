const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { GalleryCreate, GalleryUpdate, GalleryDelete } = require('../../controllers/galleryController.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const auth = require('../../middlewares/auth.js');
const router = express.Router();
router.post('/', auth, isAdmin, upload.single('image'), GalleryCreate);
router.put('/:id', auth, isAdmin, upload.single('image'), GalleryUpdate);
router.delete('/:id', auth, isAdmin, GalleryDelete);

module.exports = router;