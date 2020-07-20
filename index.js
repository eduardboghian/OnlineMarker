const bodyParser = require('body-parser')
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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  next();
});

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

app.get('/api', (req, res) => {
  res.send('Hello World!')
})

// ROUTES

const auth = require('./routes/auth')
const product = require('./routes/product')
const chat = require('./routes/chat')
app.use('/api', auth)
app.use('/api/product', product)
app.use('/api/chat', chat)

// CONNECT DB

const db = require('./db')


// SOKET.IO
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users')

io.on('connect', (socket) => {
  socket.on('join', ({ username, room }, callback) => {
    console.log('joined...', username, room)
    const { error, user } = addUser({ id: socket.id, username, room })

    if (error) return callback(error)

    socket.join(user.room)

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback()
  })

  socket.on('sendMessage', async (message, callback) => {
    const user = getUser(socket.id)

    const room = user.room
    const uid1 = room.slice(0, room.length / 2)
    const uid2 = room.slice(room.length / 2, room.length)
    const msg = { user: user.name, text: message }

    let newMsg = await Room.findOneAndUpdate({ uid1, uid2 },
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

// let server = app.listen(apiPort, () => console.log(`app running on port ${apiPort}...`))

let server = http.listen(apiPort, function () {
  console.log('listening on *:3001');
})

module.exports = server
