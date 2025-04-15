const express = require('express');
const upload = require('../../middlewares/uploadFile.js')
const { PartnerCreate, PartnerUpdate, PartnerDelete } = require('../../controllers/partnerController.js');
const auth = require('../../middlewares/auth.js');
const isAdmin = require('../../middlewares/isAdmin.js');
const router = express.Router();

router.post('/', auth, isAdmin, upload.single("image"), PartnerCreate);
router.put('/:id', auth, isAdmin, upload.single("image"), PartnerUpdate);
router.delete('/:id', auth, isAdmin, PartnerDelete);




module.exports = router;