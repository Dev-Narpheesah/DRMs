const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true
    }
})

module.exports = mongoose.model('UserInfo', UserInfoSchema);