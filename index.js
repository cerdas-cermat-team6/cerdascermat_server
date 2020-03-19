const env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  require('dotenv').config()
}
const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const QuestionController = require('./controllers/QuestionController')

app.use(cors());
app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

app.get('/', (req, res) => res.send("Restricted area!"))
app.get('/questions', QuestionController.findAll)

io.on('connection', (socket) => {
  socket.on('test masok', _ => {
    socket.emit('masok')
    console.log("user connected");
  })
})

http.listen(process.env.PORT, _ => console.log(`You're listening to radio ${process.env.PORT}`))