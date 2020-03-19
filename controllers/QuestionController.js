const { Question } = require('../models/index.js');

class QuestionController {

  static findAll(req, res, next) {
    Question.findAll()
      .then(response => {
        let payload = []

        response.forEach(element => {
          let question = {
              id: element.id,
              question: element.question,
              answer: element.answers.split(',')
          }
          payload.push(question)
        });
        res.status(200).json(payload)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }
}

module.exports = QuestionController