const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const CartProducts = sequelize.define('cartProducts', {
    cartProductId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    SKU: {
        type: Sequelize.STRING
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.FLOAT
    },
    currency: {
        type: Sequelize.STRING
    },
    productVendor: {
        type: Sequelize.STRING
    },
    productTitle: {
        type: Sequelize.STRING
    },
    variantTitle: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING(2000)
    }
});

module.exports = CartProducts;