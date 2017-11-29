module.exports = {

  post: async (req, res) => {
    const logedInUser = req.user;
    res.redirect('/send');
  },  

  get: (req, res) => {
    const logedInUser = req.user;
    res.render('secretsanta');
  }
};