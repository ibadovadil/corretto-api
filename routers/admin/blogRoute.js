const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { BlogCreate, BlogUpdate, DeleteBlog } = require('../../controllers/blogController.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const auth = require('../../middlewares/auth.js');
const router = express.Router();

router.post('/', auth, isAdmin, upload.single("image"), BlogCreate);
router.put('/:id', auth, isAdmin, upload.single("image"), BlogUpdate);
router.delete('/:id', auth, isAdmin, DeleteBlog);




module.exports = router;