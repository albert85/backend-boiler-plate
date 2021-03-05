/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const InviteUser = sequelize.define('InviteUser', {
    email: DataTypes.STRING,
  }, {});
  InviteUser.associate = (models) => {};
  return InviteUser;
};
