const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  category: String,
  location: String,
  userId: String,
  promovated: String,
  name: String,
  price: String,
  picture: String,
  shortDescription: String,
  date: {
    type: Date,
    default: new Date()
  },
})

module.exports.Product = mongoose.model('products', productSchema, 'products')