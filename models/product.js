const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  category: String,
  location: String,
  userId: String,
  email: String,
  phone: String,
  promovated: String,
  name: String,
  username: String,
  price: String,
  picture: String,
  shortDescription: String,
  date: {
    type: Date,
    default: new Date()
  },
})

module.exports.Product = mongoose.model('products', productSchema, 'products')
