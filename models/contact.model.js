module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "contact",
    {
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      middleName: { type: DataTypes.STRING(100) },
      lastName: { type: DataTypes.STRING(100), allowNull: false },
      nickName: { type: DataTypes.STRING(100) },
      isFavorite: { type: DataTypes.STRING(1) },
      pictureUrl: { type: DataTypes.STRING(100) }
    },
    {}
  );
};
