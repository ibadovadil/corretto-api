const express = require('express');
const auth = require('../../middlewares/auth.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const { SliderListItem, SliderGetById } = require('../../controllers/sliderController.js');
const { HeroTitleListItem, HeroTitleGetById } = require('../../controllers/heroTitleController.js');
const { CounterListItem, CounterGetById } = require('../../controllers/counterController.js');
const { PartnerListItem, PartnerGetById } = require('../../controllers/partnerController.js');
const { productListByPagination, productGetById, productListItem, getProductsByTag, getProductsByCategory } = require('../../controllers/product/productController.js');
const { CategoryListItem, CategoryGetById } = require('../../controllers/product/categoryController.js');
const { userAuth } = require('../../controllers/authController.js');
const { UserListItem, UserGetById, UserCreate, UserUpdate, UserDelete, userProfile, UserProfile } = require('../../controllers/userController.js');
const { TagGetById, TagListItem } = require('../../controllers/product/tagController.js');
const { createBasket, getBasketByUserId, updateBasket, deleteBasket, deleteProductFromBasket } = require('../../controllers/product/basketController.js');
const { BlogListItem, BlogGetById } = require('../../controllers/blogController.js');
const { getWishlistByUser, createWishlist, addProductToWishlist, removeProductFromWishlist, deleteWishlist, createOrUpdateWishlist } = require('../../controllers/product/wishlistController.js');
const router = express.Router();


//Slider
// router.get('/slider', auth, isAdmin, SliderListItem);
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

//Blog
router.get('/blog', BlogListItem)
router.get('/blog/:id', BlogGetById)

//Product
router.get('/product', productListItem);
router.get('/product/:id', productGetById);
router.get('/productpag', productListByPagination);
router.get('/productbytag/:tagId', getProductsByTag);
router.get('/productbycat/:catId', getProductsByCategory);

//Category
router.get('/category', CategoryListItem);
router.get('/category/:id', CategoryGetById);

//Tag
router.get('/tag', TagListItem);
router.get('/tag/:id', TagGetById);

//User
router.get('/user', auth, isAdmin, UserListItem)
router.get('/user/:id', auth, isAdmin, UserGetById)
router.get('/profile', auth, UserProfile)
router.post('/user', UserCreate)
router.put('/user/:id', auth, UserUpdate)
router.delete('/user/:id', auth, UserDelete)

//Auth
router.post('/signin', userAuth)


//Basket
router.get("/basket", auth, getBasketByUserId);
router.post("/basket", auth, createBasket);
router.put("/basketUpdate", auth, updateBasket);
router.delete("/basket/:productId", auth, deleteProductFromBasket);
router.delete("/basket", auth, deleteBasket);

//Wishlist
router.get("/wishlist", auth, getWishlistByUser);
router.post("/wishlist", auth, createOrUpdateWishlist);
router.post("/wishlist/remove", auth, removeProductFromWishlist);
router.delete("/wishlist", auth, deleteWishlist);

module.exports = router;