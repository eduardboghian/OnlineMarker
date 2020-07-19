const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  location: String,
  phoneNumber: String,
  profilePicture: String,
  contactList: Array
})

module.exports.User = mongoose.model('users', userSchema, 'users')