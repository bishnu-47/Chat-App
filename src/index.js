const http = require('http');
const path = require('path');

const express = require('express')
const socketio = require('socket.io');
const Filter = require('bad-words')

const { generateMessage, generateLocationMessage } = require('./utils/messages.js')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
} = require('./utils/users.js')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000


io.on('connection', (socket) =>{
    console.log('New WebSockt connection')

    socket.on('join', ({ username, room }, callback)=>{
        const { user, error } = addUser({
            id: socket.id, username, room,
        })

        if(error){
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has Joined!`))
        callback()
    })

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id)
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity is not allowed')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', ({latitude, longitude}, callback)=>{
        const url = `https://google.com/maps?q=${latitude},${longitude}`
        const user = getUser(socket.id)

        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, url))
        callback()
    })

    socket.on('disconnect', () =>{
        const removedUser = removeUser(socket.id)

        if(removedUser){
            io.to(removedUser.room).emit('message', generateMessage(`${removedUser.username} has left!`))
        }
    })
})

server.listen(port, ()=>{
    console.log('Server started at port ',3000)
})
