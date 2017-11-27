const User = require('./Models/userModel');

const generate = async (logedInUser) => {  

  const compareId = logedInUser.id;

  let random = Math.floor(Math.random() * 4);
  let rec = await  User.find({}).limit(1).skip(random);

  let recipient = rec.pop();
  
  while(compareId == recipient.id) {

    random = Math.floor(Math.random() * 4);
    rec = await  User.find({}).limit(1).skip(random).exec();

    recipient = rec.pop();

    if (logedInUser.isSanta) { return 'You are already a Santa'; }

    if (compareId != recipient.id) { return recipient; }
  }

  if (logedInUser.isSanta) { return 'You are already a Santa'; }

  return recipient;
  
}

module.exports = {generate};

