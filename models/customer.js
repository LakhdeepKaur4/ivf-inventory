const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Customers = sequelize.define('customers',{
    customerId: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
});

module.exports = Customers;