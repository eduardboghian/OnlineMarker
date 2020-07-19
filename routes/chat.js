const { Messages, Room } = require('../models/chat')
const { User, Doctor } = require('../models/user')
const router = require('express').Router()

router.get('/load-messages/:uid1/:uid2', async (req, res) => {
    let room = await Room.find({ uid1: req.params.uid1, uid2: req.params.uid2 })

    res.send(room)
})

// CREATE ROOM
router.post('/create-room/:uid1/:uid2', async (req, res) => {
    let room = await Room.find({ uid1: req.params.uid1, uid2: req.params.uid2 })
    if (room.length > 0) return res.status(200).send('romm already exists...')

    room = new Room({ uid1: req.params.uid1, uid2: req.params.uid2, messages: [] })
    room = await room.save()
    res.send(room)
})

// ADD MESSAGE TO ROOM  
router.put('/newmsg/:room', async (req, res) => {
    const room = req.params.room
    const uid1 = room.slice(0, room.length / 2)
    const uid2 = room.slice(room.length / 2, room.length)
    const msg = { user: req.body.name, text: req.body.message }

    let messages = await Room.findOneAndUpdate({ uid1, uid2 },
        { $push: { messages: msg } },
        { new: true }
    )

    res.send(messages)
})

// UPDATE CONTACT LIST
router.put('/add-contact/:uid1/:uid2', async (req, res) => {
    let user = await User.findOne({ _id: req.params.uid1, contactList: req.params.uid2 })
    let user2 = await User.findOne({ _id: req.params.uid2 })
    if (user) return res.status(200).send({ user, user2 })

    user = await User.findOneAndUpdate({ _id: req.params.uid1 }, { $push: { contactList: req.params.uid2 } }, { new: true })
    user2 = await User.findOneAndUpdate({ _id: req.params.uid2 }, { $push: { contactList: req.params.uid1 } }, { new: true })

    res.status(200).send({ user, user2 })
})

// DELETE ALL MESSAGES **REMOVE THIS CODE

router.delete('/messages', async (req, res) => {
    const msgs = await Messages.deleteMany()
    res.send(msgs)
})

module.exports = router