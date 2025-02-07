const express = require('express');
const { SliderListItem, SliderGetById } = require('../../controllers/sliderController.js');
const { HeroTitleListItem, HeroTitleGetById } = require('../../controllers/heroTitleController.js');
const { CounterListItem, CounterGetById } = require('../../controllers/counterController.js');
const { PartnerListItem,PartnerGetById } = require('../../controllers/partnerController.js');
const { productListByPagination, productGetById, productListItem } = require('../../controllers/productController.js');
const { CategoryListItem, CategoryGetById } = require('../../controllers/categoryController.js');
const router = express.Router();

//Slider
router.get('/slider', SliderListItem);
router.get('/slider/:id', SliderGetById);

//Hero Title
router.get('/heroTitle', HeroTitleListItem)
router.get('/heroTitle/:id', HeroTitleGetById)

//Counter
router.get('/counter', CounterListItem)
router.get('/counter/:id', CounterGetById)

//Partner
router.get('/partner', PartnerListItem)
router.get('/partner/:id', PartnerGetById)

//Product
router.get('/product', productListItem);
router.get('/product/:id', productGetById);
router.get('/productpag',productListByPagination);

//Category
router.get('/category', CategoryListItem);
router.get('/category/:id', CategoryGetById);
module.exports = router;