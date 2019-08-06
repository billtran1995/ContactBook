module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "account",
    {
      userName: {
        type: DataTypes.STRING(20),
        allowNull: false
      },
      pictureUrl: { type: DataTypes.STRING }
    },
    {}
  );
};
