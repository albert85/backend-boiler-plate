module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@club.com',
        address: 'lagos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin1',
        email: 'admin1@club.com',
        address: 'lagos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'manager',
        email: 'manager@club.com',
        address: 'lagos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'member',
        email: 'member@club.com',
        address: 'lagos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
