/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ClubMembers', [
      {
        clubId: 1,
        userId: 1,
        role: 'admin',
      },
      {
        clubId: 2,
        userId: 2,
        role: 'admin',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ClubMembers', null, {});
  },
};
