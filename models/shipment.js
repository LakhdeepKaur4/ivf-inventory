const Sequelize = require('sequelize');

const sequelize = require('../config/mysql');

const Shipments = sequelize.define('shipments',{
    shipmentId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    trackingNumber: {
        type: Sequelize.STRING
    }
});

module.exports = Shipments;