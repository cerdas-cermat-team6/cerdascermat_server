const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  require('dotenv').config()
}
const cors = require('cors')
const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { Question } = require('./models')

app.use(cors())

io.on('connection', (socket) => {
  console.log('a user joined')
  socket.on('fetchQuestions', _ => {
    Question.findAll()
      .then(data => {
        socket.emit('questions', data)
      })
      .catch(err => {
        console.log(err, '<<<<<')
      })
  })
  socket.on('sendChat', payload => {
    socket.broadcast.emit('userChat', payload)
  })
})

http.listen(process.env.PORT, _ => console.log(`You're listening to radio ${process.env.PORT}`))