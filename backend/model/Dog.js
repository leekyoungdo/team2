function Dog(Sequelize, DataTypes) {
  return Sequelize.define(
    "Dog",
    {
      dog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dog_kind: {
        type: DataTypes.STRING(30),
      },
      dog_gender: {
        type: DataTypes.STRING(10),
      },
      dog_age: {
        type: DataTypes.STRING(20),
      },
      happenplace: {
        type: DataTypes.STRING(255),
      },
      image: {
        type: DataTypes.STRING(500),
      },
      specialmark: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "Dog",
      frezzeTableName: true,
      timestamps: false,
    }
  );
}

module.exports = Dog;
