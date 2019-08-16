const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Payments = sequelize.define('payments',{
    paymentId: {
        type: Sequelize.NUMBER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    amount: {
        type: Sequelize.NUMBER
    },
    displayName: {
        type: Sequelize.STRING
    },
    method: {
        type: Sequelize.STRING
    },
    paymentMethod: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    }
});

module.exports = Payments;