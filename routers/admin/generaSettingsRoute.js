const express = require('express');
const { GeneralListItem, GeneralCreate, GeneralUpdate } = require('../../controllers/generalSettingsController');
const upload = require('../../middlewares/uploadFile');
const isAdmin = require('../../middlewares/isAdmin');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.get('/', GeneralListItem)
router.post(
    '/',
    auth,
    isAdmin,
    upload.fields([
      { name: 'logoDark', maxCount: 1 },
      { name: 'logoWhite', maxCount: 1 }
    ]),
    GeneralCreate
  );
  
  router.put(
    '/:id',
    auth,
    isAdmin,
    upload.fields([
      { name: 'logoDark', maxCount: 1 },
      { name: 'logoWhite', maxCount: 1 }
    ]),
    GeneralUpdate
  );
  
  module.exports = router;
  