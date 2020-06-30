const router = require('express').Router()

const { Product } = require('../models/product')

router.post('/add', async (req, res) => {
  console.log(req.body)

  let product = new Product(req.body.product)
  product = await product.save()

  res.send(product)
})

module.exports = router