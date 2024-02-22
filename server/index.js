const express = require('express')
const { Server } = require('socket.io')
const http = require('http');
const cors = require('cors')
const app = express()

app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    socket.on('send_message', (value) => {
        console.log(value)
        socket.broadcast.emit( 'receive_message', value )
    })
})


server.listen(3001, () => {
    console.log('SERVER RUNNING ON 3001')
})
