'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Question extends Model {}

  Question.init({
    question: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Please input your question`
        },
        notEmpty: {
          args: true,
          msg: `Please input your question`
        }
      }
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Please input the answer(s)`
        },
        notEmpty: {
          args: true,
          msg: `Please input the answer(s)`
        }
      }
    }
  },
  {
    sequelize
  })
  return Question;
};