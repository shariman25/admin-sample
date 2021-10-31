const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'member'],
    required: true
  }
})

const User = mongoose.model('User',UserSchema)
module.exports = User