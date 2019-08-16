const relations = {};

relations.orders = require('../models/order');
relations.payments = require('../models/payment');
relations.customers = require('../models/customer');
relations.addresses = require('../models/address');
relations.shipments = require('../models/shipment');

relations.orders.belongsTo(relations.customers);
relations.customers.hasMany(relations.orders);
relations.orders.belongsTo(relations.payments);
relations.orders.belongsTo(relations.shipments);
relations.addresses.belongsTo(relations.customers);
relations.customers.hasMany(relations.addresses);
relations.shipments.belongsTo(relations.addresses);

module.exports = relations;