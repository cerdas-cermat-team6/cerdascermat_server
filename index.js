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

let questionContainer = []

app.use(cors())

io.on('connection', (socket) => {
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
  socket.on('broadcastPoint', payload => {
    socket.broadcast.emit('addUserPoint', payload)
  })

  console.log('a user joined')
  console.log('emit init')
  Question.findAll()
    .then(result => {
      questionContainer = result;
      
      const idRand = Math.floor(Math.random() * questionContainer.length)
      const payload = {
        id: questionContainer[idRand].dataValues.id,
        message: questionContainer[idRand].dataValues.question,
        answers: questionContainer[idRand].dataValues.answers.split(',')
      }
      console.log(payload)
      socket.emit('feedQuestion', payload)
    })
    .catch(err => {
      console.log(err)
    })
})
setInterval(() => {
  if (questionContainer.length > 0) {
    const idRand = Math.floor(Math.random() * questionContainer.length)
    const payload = {
      id: questionContainer[idRand].id,
      message: questionContainer[idRand].question,
      answers: questionContainer[idRand].answers.split(',')
    }
    console.log(payload)
    io.emit('feedQuestion', payload)
  }
}, 15000);

http.listen(process.env.PORT, _ => console.log(`You're listening to radio ${process.env.PORT}`))