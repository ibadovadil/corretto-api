const express = require('express');
const { productCreate, productListItem, productUpdate, productDelete, productGetById } = require('../../controllers/productController.js');
const upload = require('../../middlewares/uploadFile.js');
const router = express.Router();

router.get('/', productListItem);
router.get('/:id', productGetById);
router.post('/', upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "images", maxCount: 10 }]), productCreate);
router.put('/:id', upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "images", maxCount: 10 }]), productUpdate);
router.delete('/:id', productDelete);



module.exports = router;