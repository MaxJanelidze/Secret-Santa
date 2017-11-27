const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  hasSanta: {
    type: String,
    default: false
  },
  isSanta: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: new Date()
  }
});

userSchema.methods.isValidPassword = async (newPassword, user) => {
  try {
    return await bcrypt.compare(newPassword, user.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Export the model
const User = module.exports = mongoose.model('User', userSchema, 'user');

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save();
    });
  });
};
