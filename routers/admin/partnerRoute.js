const express = require('express');
const upload = require('../../middlewares/uploadFile.js')
const { PartnerCreate, PartnerUpdate, PartnerDelete } = require('../../controllers/partnerController.js');
const router = express.Router();

router.post('/', upload.single("image"), PartnerCreate);
router.put('/:id', upload.single("image"), PartnerUpdate);
router.delete('/:id', PartnerDelete);



module.exports = router;