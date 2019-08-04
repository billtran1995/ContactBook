module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "phoneNumber",
    {
      number: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      type: { type: DataTypes.STRING(20), allowNull: false }
    },
    {}
  );
};
