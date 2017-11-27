const router = require("express-promise-router")();

const indexCtrl = require("../controllers/indexController");

router.route("/")
  .get(indexCtrl.get);

module.exports = router;
