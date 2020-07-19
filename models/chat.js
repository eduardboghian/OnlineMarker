const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

const roomSchema = new mongoose.Schema({
    uid1: {
        type: String,
        required: true
    },
    uid2: {
        type: String,
        required: true
    },
    messages: {
        type: Array
    }
})

module.exports.Messages = mongoose.model('Messages', messageSchema)
module.exports.Room = mongoose.model('Room', roomSchema)