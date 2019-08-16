const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Orders = sequelize.define('orders',{
    orderId: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    currency: {
        type: Sequelize.STRING
    },
    discount: {
        type: Sequelize.NUMBER
    },
    email: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
});

module.exports = Orders;