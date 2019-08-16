const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Orders = sequelize.define('orders',{
    orderId: {
        type: Sequelize.STRING,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dateCreated: {
        type: Sequelize.DATE
    }
});

module.exports = Orders;