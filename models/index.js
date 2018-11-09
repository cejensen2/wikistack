const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/wikistack');

module.exports = {
  db
}
