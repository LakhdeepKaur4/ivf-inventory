const relations = {};

relations.orders = require('../models/order');
relations.payments = require('../models/payment');
relations.customers = require('../models/customer');
relations.addresses = require('../models/address');
relations.shipments = require('../models/shipment');
relations.carts = require('../models/cart');
relations.cartProducts = require('../models/cartProduct');

relations.orders.belongsTo(relations.customers, { foreignKey: 'customerId' });
relations.customers.hasMany(relations.orders, { foreignKey: 'customerId' });
relations.orders.belongsTo(relations.payments, { foreignKey: 'paymentId' });
relations.orders.belongsTo(relations.shipments, { foreignKey: 'shipmentId' });
relations.addresses.belongsTo(relations.customers, { foreignKey: 'customerId' });
relations.customers.hasMany(relations.addresses, { foreignKey: 'customerId' });
relations.shipments.belongsTo(relations.addresses, { foreignKey: 'addressId' });
relations.cartProducts.belongsTo(relations.carts), { foreignKey: 'cartId' };
relations.orders.belongsTo(relations.carts, { foreignKey: 'cartId' });

module.exports = relations;