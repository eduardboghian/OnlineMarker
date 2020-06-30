const router = require('express').Router()

const { Product } = require('../models/product')

router.post('/add', async (req, res) => {

  let product = new Product(req.body.product)
  product = await product.save()
  console.log(product)

  res.send(product)
})

module.exports = router
