const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Orders = sequelize.define('orders',{
    orderId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    currency: {
        type: Sequelize.STRING
    },
    amount: {
        type: Sequelize.FLOAT
    },
    email: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING,
        enum : ['NEW','APPROVED','PAID','PACKED','PAYMENT FAILED','SHIPPED','DELIVERED','COMPLETED'],
        defaultValue: 'NEW'
    },
    storeId: {
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