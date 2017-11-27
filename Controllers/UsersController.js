const User = require('../Models/userModel')

module.exports = {
  // Sign Up
  signUp: async (req, res) => {
    const { fullname, email, password } = req.value.body;
    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      return res.status(403).json({ error: 'Email is already in use' });
    }

    const newUser = new User({ fullname, email, password });
    
    User.createUser(newUser, (err, user) => {
      if (err) throw err;
    });

    res.redirect('/user/login');
  },

  // Get registration page
  getSignUp: (req, res) => {
    res.render('signup');
  },

  // Sign In
  login: (req, res) => {
    res.redirect('/secret');
  },

  // Get login page
  getLogin: (req, res) => {
    res.render('login');
  },
  
  // Log out the user
  logout: (req, res) => {
    req.logout();
    res.redirect('/user/login');
  }
};