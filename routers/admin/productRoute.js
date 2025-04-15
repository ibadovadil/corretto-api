const express = require('express');
const { productCreate, productListItem, productUpdate, productDelete, productGetById } = require('../../controllers/product/productController.js');
const upload = require('../../middlewares/uploadFile.js');
const auth = require('../../middlewares/auth.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const router = express.Router();

router.get('/', productListItem);
router.get('/:id', productGetById);

router.post(
    '/',
    auth,
    isAdmin,
    upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "images", maxCount: 10 }]),
    productCreate
  );
  
  router.put(
    '/:id',
    auth,
    isAdmin,
    upload.fields([{ name: "coverImage", maxCount: 1 }, { name: "images", maxCount: 10 }]),
    productUpdate
  );
  
  router.delete('/:id', auth, isAdmin, productDelete);
  



module.exports = router;