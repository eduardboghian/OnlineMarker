const bodyParser = require('body-parser')
const cluster = require('cluster')
const { Doctor } = require('./models/user')
const { Room } = require('./models/chat')
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const apiPort = process.env.PORT || 3001
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http)

require('dotenv').config({ path: `${__dirname}/.env` })
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/uploads/', express.static('uploads'))
app.use(cors())
app.use(bodyParser.json())

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

// ROUTES

const auth = require('./routes/auth')
const product = require('./routes/product')
app.use('/api', auth)
app.use('/api/product', product)

// CONNECT DB

const db = require('./db')


// SOKET.IO
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })

    if (error) return callback(error)

    socket.join(user.room)

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  })

  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id)

    const room = user.room
    const docId = room.slice(0, room.length / 2)
    const patientId = room.slice(room.length / 2, room.length)
    const msg = { user: user.name, text: message }

    let newMsg = await Room.findOneAndUpdate({ docId: docId, patientId: patientId },
      { $push: { messages: msg } },
      { new: true }
    )

    io.to(user.room).emit('message', { user: user.name, text: message })

    callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` })
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })
    }
  })
})


// BUILD THE CLIENT SIDE

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

let server = app.listen(apiPort, () => console.log(`app running on port ${apiPort}...`))

module.exports = server
