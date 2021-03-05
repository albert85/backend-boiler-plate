const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'admin',
        email: 'admin@club.com',
        address: 'lagos',
        password: await bcrypt.hash('admin123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'admin1',
        email: 'admin1@club.com',
        address: 'lagos',
        password: await bcrypt.hash('admin123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'manager',
        email: 'manager@club.com',
        address: 'lagos',
        password: await bcrypt.hash('manager123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'member',
        email: 'member@club.com',
        address: 'lagos',
        password: await bcrypt.hash('member123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
