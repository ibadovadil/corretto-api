const express = require('express');
const { GeneralListItem, GeneralCreate, GeneralUpdate } = require('../../controllers/generalSettingsController');
const upload = require('../../middlewares/uploadFile');
const router = express.Router();

router.get('/', GeneralListItem)
router.post('/', upload.fields([{ name: 'logoDark', maxCount: 1 }, { name: 'logoWhite', maxCount: 1 }]), GeneralCreate);
router.put('/:id', upload.fields([{ name: 'logoDark', maxCount: 1 }, { name: 'logoWhite', maxCount: 1 }]), GeneralUpdate);
module.exports = router;