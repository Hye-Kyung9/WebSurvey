const Sequelize = require("sequelize");

module.exports = class User extends (
  Sequelize.Model
) {
  static init(sequelize) {
    return super.init(
      {
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          primaryKey: true,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        nick: {
          type: Sequelize.STRING(15),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: sequelize.charset,
        collate: sequelize.collate,
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Survey, {
      foreignKey: "userId",
      sourceKey: "email",
      onDelete: "cascade",
    });
    db.User.hasMany(db.Answer, {
      foreignKey: "userId",
      sourceKey: "email",
      onDelete: "cascade",
    });
  }
};
