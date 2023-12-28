const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Board = require("./Board")(sequelize, Sequelize);

// 회원 -> 게시판 join
db.User.hasMany(db.Board, {
  foreignKey: "user_id",
});
db.Board.belongsTo(db.User, {
  ondelete: "cascade",
  foreignKey: "user_id",
});

module.exports = db;
