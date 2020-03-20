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
const PORT = 3000

app.use(cors())

let questionContainer = []
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

io.on('connection', (socket) => {
  socket.on('fetchQuestions', _ => {
    Question.findAll()
      .then(data => {
        // socket.emit('questions', data)
        let questions = data.map(item => {
          const payload = {
            id: item.id,
            message: item.question,
            answers: item.answers.split(',')
          }
          return payload
        })
        socket.emit('questions', questions)
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
  socket.on('competitionRequest', _ => {
    io.emit('competitionStarted')
  })
  socket.on('competitionExit', _ => {
    io.emit('competitionEnded')
  })

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

http.listen(PORT, _ => console.log(`You're listening to radio ${PORT}`))