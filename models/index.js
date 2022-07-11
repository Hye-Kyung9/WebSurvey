const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const User = require('./user');
const Survey = require('./survey');
const Question = require('./question');
const Answer = require('./answer');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

sequelize.charset = 'utf8';
sequelize.collate = 'utf8_general_ci';

db.sequelize = sequelize;
db.User = User;
db.Survey = Survey;
db.Question = Question;
db.Answer = Answer;

User.init(sequelize);
Survey.init(sequelize);
Question.init(sequelize);
Answer.init(sequelize);

User.associate(db);
Survey.associate(db);
Question.associate(db);
Answer.associate(db);

module.exports = db;