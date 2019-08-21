module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "address",
    {
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: { type: DataTypes.STRING(50), allowNull: false },
      state: { type: DataTypes.STRING(2) },
      zip: { type: DataTypes.STRING(10) },
      country: { type: DataTypes.STRING(50), allowNull: false },
      type: { type: DataTypes.STRING(20), allowNull: false }
    },
    {}
  );
};
