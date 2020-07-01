const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { User } = require('../models/user')

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email: email })
  if (!user) return res.status(400).send('Email or password is incorrect')

  const validPass = await bcrypt.compare(password, user.password)
  if (!validPass) return res.status(400).send('Email or password is incorrect')

  const token = jwt.sign({
    _id: user._id,
    name: user.username,
    email: user.email,
    location: user.location,
    phoneNuber: user.phoneNuber
  }, process.env.TOKEN_SECRET)
  res.header('authToken', token).send('logged in')
})

router.post('/register', async (req, res) => {
  const userData = { ...req.body.userData }
  userData.username = userData.firstName + ' ' + userData.lastName

  const check = await User.findOne({ email: userData.email })
  if (check) return res.status(400).send('Email already registrated')

  const salt = await bcrypt.genSalt(10)
  const hashedPass = await bcrypt.hash(userData.password, salt)
  userData.password = hashedPass

  let newUser = new User(userData)
  newUser = await newUser.save()

  res.status(200).send(newUser)
})

module.exports = router
