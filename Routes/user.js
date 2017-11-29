const router = require('express-promise-router')();
const passport = require('passport');
require('../Auth/passport');

const User = require('../Models/userModel');
const { signup } = require('../helpers/routeHelpers');
const { login } = require('../helpers/routeHelpers');
const UsersCtrl = require('../Controllers/usersController');
const passportLogin = passport.authenticate('local', {
  successRedirect:'/secret',
  failureRedirect:'/user/login',
  failureFlash: true,
});

router.route("/signup")
  .post(signup.validateBody(signup.schemas.authSchema), UsersCtrl.signUp)
  .get(UsersCtrl.getSignUp);

router.route("/login")
  .post(login.validateBody(login.schemas.authSchema), passportLogin, UsersCtrl.login)
  .get(UsersCtrl.getLogin);

router.route("/logout")
  .get(UsersCtrl.logout);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
