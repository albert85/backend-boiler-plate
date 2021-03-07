/* eslint-disable no-unused-vars */

export default (sequelize, DataTypes) => {
  const ClubMember = sequelize.define('ClubMember', {
    role: {
      type: DataTypes.STRING,
      values: ['admin', 'manager', 'member'],
    },
    active: DataTypes.BOOLEAN,
  }, {});
  ClubMember.associate = (models) => {
    ClubMember.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'clubMember',
    });
    ClubMember.belongsTo(models.Club, {
      foreignKey: 'clubId',
      as: 'club',
    });
  };
  return ClubMember;
};
