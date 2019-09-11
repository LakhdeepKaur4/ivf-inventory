const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Carts = sequelize.define('carts',{
    cartId: {
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
    discount: {
        type: Sequelize.FLOAT
    },
    email: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    }
});

module.exports = Carts;