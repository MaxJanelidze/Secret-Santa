const mailer = require('nodemailer');

const {generate} = require('../recipientGenerator');
require('../Configurations/config');

module.exports = {

  get: async (req, res) => {
    const smtpTransport = mailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GmailUser,
        pass: process.env.GmailPass
      }
    });
    const recipient = await generate(req.user);
    const mailOptions = { 
      to: req.user.email,
      subject: 'Secret santa', 
      text: recipient.fullname + ', აი ვისი სეკრეტ სანტა უნდა იყო ახალ წელს :):)'
    };

    smtpTransport.sendMail(mailOptions, (err) => {
      if (err) {
        res.send(err.message);
      } else {
        res.render('email');
      }
    });
  }
};