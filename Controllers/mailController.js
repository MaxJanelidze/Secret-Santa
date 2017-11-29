const {generate} = require('../MailHelpers/recipientGenerator');
const {send} = require('../MailHelpers/mailSender');

module.exports = {

  get: async (req, res) => {
    
    logedInUser = req.user;

    const recipient = await generate(req.user);
    const isOK = await send(logedInUser, recipient);

    if (!isOK) { res.send('Unfortunately mail does not sent.'); return; }

    if (recipient == logedInUser) { res.send('You are already a Santa'); return; }

    res.render('email');
  }
};