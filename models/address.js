const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Addresses = sequelize.define('addresses',{
    addressId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    address1: {
        type: Sequelize.STRING
    },
    address2: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING
    },
    country: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.STRING
    },
    region: {
        type: Sequelize.STRING
    }
});

module.exports = Addresses;