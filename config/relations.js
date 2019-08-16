const relations = {};

relations.orders = require('../models/order');
relations.payments = require('../models/payment');
relations.customers = require('../models/customer');
relations.addresses = require('../models/address');
relations.shipments = require('../models/shipment');
relations.carts = require('../models/cart');
relations.cartProducts = require('../models/cartProduct');

relations.orders.belongsTo(relations.customers);
relations.customers.hasMany(relations.orders);
relations.orders.belongsTo(relations.payments);
relations.orders.belongsTo(relations.shipments);
relations.addresses.belongsTo(relations.customers);
relations.customers.hasMany(relations.addresses);
relations.shipments.belongsTo(relations.addresses);
relations.cartProducts.belongsTo(relations.carts);
relations.orders.belongsTo(relations.carts);

module.exports = relations;