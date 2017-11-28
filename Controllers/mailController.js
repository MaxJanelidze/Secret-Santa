const {generate} = require('../recipientGenerator');
const {send} = require('../mailSender');

module.exports = {

  get: async (req, res) => {
    
    logedInUser = req.user;

    const recipient = await generate(req.user);
    const isOK = await send(logedInUser, recipient);

    if (!isOK) { res.send('Unfortunately mail does not sent.'); return; }

    res.render('email');
  }
};