const User = require('../Models/userModel');

const generate = async (logedInUser) => {  

  if (logedInUser.isSanta) { return logedInUser; }

  const compareId = logedInUser.id;
  let recipient = null;
  let random = 0;
  const usersAmount = await User.find({}).count(); // Count registered users amount!!!

  while(!logedInUser.isSanta) {

    random = Math.floor(Math.random() * usersAmount);
    rec = await  User.find({}).limit(1).skip(random).exec();

    recipient = rec.pop();

    if (compareId != recipient.id && recipient.id != logedInUser.mySanta) {

      if (recipient.mySanta == null) {

        await User.update({ '_id': recipient.id }, { $set: { 'mySanta': compareId } });
        logedInUser = await User.update({ '_id': compareId }, { $set: { 'isSanta': true } });

        return recipient;
        break;
      }
    }    
  }  
}

module.exports = {generate};
