const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Customers = sequelize.define('customers',{
    customerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    storeId: {
        type: Sequelize.INTEGER
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Customers;