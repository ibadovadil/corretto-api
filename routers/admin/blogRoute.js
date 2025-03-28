const express = require('express');
const upload = require('../../middlewares/uploadFile.js');
const { BlogCreate, BlogUpdate, DeleteBlog } = require('../../controllers/blogController.js');
const router = express.Router();

router.post('/', upload.single("image"), BlogCreate);
router.put('/:id', upload.single("image"), BlogUpdate)
router.delete('/:id', DeleteBlog);



module.exports = router;