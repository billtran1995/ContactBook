module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "email",
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      type: { type: DataTypes.STRING(20), allowNull: false }
    },
    {}
  );
};
