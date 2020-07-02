const router = require('express').Router()

const { Product } = require('../models/product')

router.post('/add', async (req, res) => {

  let product = new Product(req.body.product)
  product = await product.save()

  res.send(product)
})

router.get('/get', async (req, res) => {

  let product = await Product.find()
  console.log(product)

  res.send(product)
})

module.exports = router
