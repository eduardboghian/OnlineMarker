
// SOKET.IO
const { addUser, removeUser, getUser, getUsersInRoom } = require('../users')

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
