const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      title: {
          type: Sequelize.STRING(500),
          allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Question',
      tableName: 'questions',
      paranoid: true,
      charset: sequelize.charset,
      collate: sequelize.collate
    });
  }

  static associate(db) {
    db.Question.belongsTo(db.Survey, { foreignKey: 'surveyId', targetKey: 'id' });
    db.Question.hasMany(db.Answer, { foreignKey: 'questionId', sourceKey: 'id' });
  }
};