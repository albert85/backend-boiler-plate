/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const Club = sequelize.define('Club', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {});
  Club.associate = (models) => {};
  return Club;
};
