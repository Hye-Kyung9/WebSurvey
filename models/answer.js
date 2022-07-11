const Sequelize = require('sequelize');

module.exports = class Answer extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      answer: {
        type: Sequelize.STRING(300),
        allowNull: false,
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Answer',
      tableName: 'answers',
      paranoid: true,
      charset: sequelize.charset,
      collate: sequelize.collate
    });
  }
  static associate(db) {
    db.Answer.belongsTo(db.Question, { foreignKey: 'questionId', targetKey: 'id' });
    db.Answer.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'email' });
  }
};