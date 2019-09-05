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
    discount: {
        type: Sequelize.FLOAT
    },
    email: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING,
        enum : ['ORDERED','APPROVED','PACKED','SHIPPED','DELIVERED'],
        defaultValue: 'ORDERED'
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

module.exports = Orders;