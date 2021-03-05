module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clubs', [
      {
        name: 'warewa club',
        address: 'lagos',
        userId: 1,
      },
      {
        name: 'arepo club',
        address: 'lagos',
        userId: 1,
      },
      {
        name: 'mowe club',
        address: 'lagos',
        userId: 2,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Clubs', null, {});
  },
};
