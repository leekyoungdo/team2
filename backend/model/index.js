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
db.Comment = require("./Comment")(sequelize, Sequelize);

// 게시판 관련 join
db.User.hasMany(db.Board, {
  foreignKey: "user_id",
});
db.Board.belongsTo(db.User, {
  ondelete: "cascade",
  foreignKey: "user_id",
});

// 댓글 관련 join
db.Board.hasMany(db.Comment, {
  foreignKey: "board_id",
});
db.Comment.belongsTo(db.Board, {
  ondelete: "cascade",
  foreignKey: "board_id",
});
db.User.hasMany(db.Comment, {
  foreignKey: "user_id",
});
db.Comment.belongsTo(db.User, {
  ondelete: "cascade",
  foreignKey: "user_id",
});

module.exports = db;
