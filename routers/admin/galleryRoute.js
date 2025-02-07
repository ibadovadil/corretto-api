const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { GalleryListItem, GalleryCreate, GalleryUpdate, GalleryDelete } = require('../../controllers/galleryController.js');
const router = express.Router();

router.get('/', GalleryListItem)
router.post('/', upload.single('image'), GalleryCreate)
router.put('/:id', upload.single('image'), GalleryUpdate)
router.delete('/:id', upload.single('image'), GalleryDelete)

module.exports = router;