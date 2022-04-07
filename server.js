const express = require('express');

const app = express()
const http = require('http').createServer(app)

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000;

http.listen(port, ()=>{console.log(`Listening to port ${port}`)});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

// Socket io setup
const io = require('socket.io')(http);

io.on('connection', (socket)=>{
    socket.on('message', (msg)=>{
        socket.broadcast.emit('message', msg)
    })

// updating about new user

    socket.on('newUser', (username)=>{
        socket.broadcast.emit('update', username + "joined the Chat")
    })

    socket.on('exitUser', (username)=>{
        socket.broadcast.emit('update', username + "left the Chat")
    })
})
