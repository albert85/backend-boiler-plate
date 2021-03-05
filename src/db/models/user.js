
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {});
  User.associate = (models) => {};
  return User;
};
