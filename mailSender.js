const mailer = require("nodemailer");

require("./Configurations/config");

const send = async (logedInUser, recipient) => {

  const smtpTransport = mailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.GmailUser,
      pass: process.env.GmailPass
    }
  });

  const mailOptions = {
    to: logedInUser.email,
    subject: "Secret santa",
    text: recipient.fullname + ", აი ვისი სეკრეტ სანტა უნდა იყო ახალ წელს :):)"
  };

  // const a = await smtpTransport.sendMail(mailOptions, err => {
  //   if (err) {
  //     returnValue = false;
  //     console.log(returnValue + 'oop');
  //   } else {
  //     returnValue = true;
  //     console.log(returnValue + 'oof');
  //   }
  //   console.log(returnValue + 'eee');
  //   if (!returnValue) return false;
    
  //   return true
  // });

  const sentmail = await smtpTransport.sendMail(mailOptions);

  if (sentmail.rejected.length != 0) return false;

  return true;
  
};

module.exports = { send };
