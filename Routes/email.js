const router = require('express-promise-router')();

const mailCtrl = require('../Controllers/mailController');
const val = require('../checkUserValidation');

router.route('/')
  .get(val.ensureAuthenticated, mailCtrl.get);

module.exports = router;
