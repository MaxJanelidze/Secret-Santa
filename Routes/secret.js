const router = require('express-promise-router')();

const val = require('../checkUserValidation');
const secretCtrl = require('../Controllers/secretController');

router.route('/')
  .post(val.ensureAuthenticated ,secretCtrl.post)
  .get(val.ensureAuthenticated, secretCtrl.get);

module.exports = router;  