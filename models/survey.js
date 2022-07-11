const Sequelize = require("sequelize");

module.exports = class Survey extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Survey",
        tableName: "survey",
        paranoid: true,
        charset: sequelize.charset,
        collate: sequelize.collate,
      }
    );
  }

  static associate(db) {
    db.Survey.belongsTo(db.User, { foreignKey: "userId", targetKey: "email" });
    db.Survey.hasMany(db.Question, { foreignKey: "surveyId", sourceKey: "id" });
  }
};
