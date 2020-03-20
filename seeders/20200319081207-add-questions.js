'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fs = require('fs')
    const data = JSON.parse(fs.readFileSync('./seed_data/joke.json', 'utf8'))
    return queryInterface.bulkInsert('Questions', data, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
