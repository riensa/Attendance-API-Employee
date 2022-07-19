'use strict';
const bcrypt = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('employees', [{
      fullname: 'John Doe',
      dob: '2000-01-01 07:30:00',
      email: 'johndoe@office.com',
      password: bcrypt.hashSync('01Jan2000', 8),
      password_reset_date: '2022-07-19 07:30:00',
      password_reset_by: 1,
      created_by: 1,
      status: 'active',
      createdAt: '2022-07-19 07:30:00',
      updatedAt: '2022-07-19 07:30:00'
    }, {
      fullname: 'Jane Doe',
      dob: '2000-12-01 07:30:00',
      email: 'janedoe@office.com',
      password: bcrypt.hashSync('01Dec2000', 8),
      password_reset_date: '2022-07-19 07:30:00',
      password_reset_by: 1,
      created_by: 1,
      status: 'active',
      createdAt: '2022-07-19 07:30:00',
      updatedAt: '2022-07-19 07:30:00'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('employees', null, {});
  }
};
