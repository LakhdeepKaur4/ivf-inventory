const Orders = require('../config/relations').orders; // Orders model imported
const Customers = require('../config/relations').customers; // Customers model imported
const Carts = require('../config/relations').carts; // Carts model imported
const CartProducts = require('../config/relations').cartProducts; // CartProducts model imported
const Addresses = require('../config/relations').addresses; // Addresses model imported
const Payments = require('../config/relations').payments; // Payments model imported
const Shipments = require('../config/relations').shipments; // Shipments model imported
const httpStatus = require('http-status'); // Module to provide HTTP response codes
const Op = require('sequelize').Op; // Sequelize operators imported

const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format

// Getting all orders
exports.getOrders = (req, res, next) => {
  try {
    Orders.findAll({
      include: [
        { model: Customers, include: [{ model: Addresses }] },
        { model: Carts, include: [{ model: CartProducts }] },
        { model: Shipments },
        { model: Payments }
      ]
    })
      .then(orders => {
        return resJson(res, httpStatus.OK, orders);
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_FOUND, { message: 'Please try again...', error: err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
  }
}

// Getting a single order based on orderId
exports.getOrderById = (req, res, next) => {
  try {
    Orders.findOne({
      where: {
        orderId: req.params.id
      },
      include: [
        { model: Customers, include: [{ model: Addresses }] },
        { model: Carts, include: [{ model: CartProducts }] },
        { model: Shipments },
        { model: Payments }
      ]
    })
      .then(orders => {
        return resJson(res, httpStatus.OK, orders);
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_FOUND, { message: 'Please try again...', error: err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
  }
}

// Creating an order with all supporting entities (Customers,Addresses,Shipments,Payments,Carts,CartProducts)
exports.create = (req, res, next) => {
  try {
    const body = req.body;
    let customerId, addressId, shipmentId, paymentId, cartId;
    Customers.create(body.customer)
      .then(customer => {
        customerId = customer.customerId;
        body.address.customerId = customer.customerId;
        Addresses.create(body.address)
          .then(address => {
            body.shipment.addressId = address.addressId;
            Shipments.create(body.shipment)
              .then(shipment => {
                shipmentId = shipment.shipmentId;
                Payments.create(body.payment)
                  .then(payment => {
                    paymentId = payment.paymentId;
                    Carts.create(body.cart)
                      .then(cart => {
                        cartId = cart.cartId;
                        body.cart.products.map(item => {
                          item.cartId = cart.cartId;
                          CartProducts.create(item);
                        })
                        let order = {
                          ...body.order,
                          customerId: customerId,
                          cartId: cartId,
                          shipmentId: shipmentId,
                          paymentId: paymentId
                        }
                        Orders.create(order)
                          .then(order => {
                            Orders.findOne({
                              where: {
                                orderId: order.orderId
                              },
                              include: [
                                { model: Customers, include: [{ model: Addresses }] },
                                { model: Carts, include: [{ model: CartProducts }] },
                                { model: Shipments },
                                { model: Payments }
                              ]
                            })
                              .then(order => {
                                return resJson(res, httpStatus.CREATED, { order });
                              })
                          })
                      })
                  })
              })
          })
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
  }
}

/* 
    Updating existing Order
*/
exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const body = req.body;
    const updatedOrder = await Orders.findOne({ where: { orderId: orderId } }).then(order => {
      // if (body.product) {
      //   body.product.cartId = order.cartId;
      //   new CartProducts(body.product).save();
      // }
      return order.update(body);
    })
    if (updatedOrder) {
      return res.status(httpStatus.OK).json({
        message: "Order Updated Page",
        updatedOrder: updatedOrder
      });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}

/* 
   Getting Products of existing order
*/
exports.getCartProductsOfExistingOrder = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    Orders.findOne({
      where: { orderId: orderId }, include: [
        { model: Carts, include: [{ model: CartProducts }] },
        { model: Shipments },
        { model: Payments }
      ]
    }).then(order => {
      // CartProducts.findAll({ where: { cartId: cartId } })
      //   .then(items => {
      return res.status(httpStatus.OK).json({ order });
      //   })
    }).catch(err => {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
    })
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}


// Searching orders on advanced filters
exports.advancedSearchOrders = (req, res, next) => {
  try {
    const body = req.query;
    Orders.findAll({
      where: {
        [Op.and]: [
          { orderId: { [Op.gte]: body.orderIdLowerLimit } },
          { orderId: { [Op.lte]: body.orderIdUpperLimit } },
        ]
      },
      include: [
        {
          model: Payments, where: {
            [Op.and]: [
              { amount: { [Op.gte]: body.orderTotalLowerLimit } },
              { amount: { [Op.lte]: body.orderTotalUpperLimit } },
              { paymentMethod: body.paymentMethod }
            ]
          }
        },
        {
          model: Carts, include: [
            {
              model: CartProducts, where: {
                [Op.or]: [
                  { productTitle: body.search },
                  { variantTitle: body.search }
                ]
              }
            }
          ]
        }
      ]
    })
      .then(orders => {
        let ordersSend = [];
        let eventDateL = body.eventDateLowerLimit.split('-');
        let eventDateU = body.eventDateUpperLimit.split('-');
        eventDateL = new Date(eventDateL[2], eventDateL[1], eventDateL[0]);
        eventDateU = new Date(eventDateU[2], eventDateU[1], eventDateU[0]);
        ordersSend = orders.filter(item => {
          console.log((item.createdAt.getTime() >= eventDateL.getTime()) && (item.createdAt.getTime() <= eventDateU.getTime()));
          return ((item.createdAt.getTime() >= eventDateL.getTime()) && (item.createdAt.getTime() <= eventDateU.getTime()));
        })
        return resJson(res, httpStatus.OK, { orders: ordersSend });
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_FOUND, { message: 'Please try again...', error: err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
  }
}

// Searching orders on advanced filters latest API
exports.advancedSearchOrdersNew = (req, res, next) => {
  try {
    const order = req.query;

    Orders.findAll({
      include: [
        { model: Customers, include: [{ model: Addresses }] },
        { model: Carts, include: [{ model: CartProducts }] },
        { model: Shipments },
        { model: Payments }
      ]
    })
      .then(orders => {
        let ordersNew = [];
        ordersNew = orders;

        if (order.orderStatus !== 'undefined' && order.orderStatus !== '' && order.orderStatus !== null) {
          ordersNew = orders.filter(item => {
            return order.orderStatus.toLowerCase() === item.status.toLowerCase();
          })
          orders = ordersNew;
        }
        if (order.paymentOption !== 'undefined' && order.paymentOption !== '' && order.paymentOption !== null) {
          ordersNew = orders.filter(item => {
            return order.paymentOption.toLowerCase() === item.payment.paymentMethod.toLowerCase();
          })
          orders = ordersNew;
        }
        if (order.orderId !== 'undefined' && order.orderId !== '' && order.orderId !== null) {
          ordersNew = orders.filter(item => {
            return parseInt(order.orderId) === item.orderId;
          })
          orders = ordersNew;
        }
        if (order.orderStart !== 'undefined' && order.orderStart !== '' && order.orderStart !== null) {
          ordersNew = orders.filter(item => {
            return order.orderStart <= item.payment.amount;
          })
          orders = ordersNew;
        }
        if (order.orderEnd !== 'undefined' && order.orderEnd !== '' && order.orderEnd !== null) {
          ordersNew = orders.filter(item => {
            return order.orderEnd >= item.payment.amount;
          })
          orders = ordersNew;
        }
        if (order.createStartDate !== 'undefined' && order.createStartDate !== '' && order.createStartDate !== null) {
          ordersNew = orders.filter(item => {
            return Date.parse(order.createStartDate) <= Date.parse(item.createdAt);
          })
          orders = ordersNew;
        }
        if (order.createEndDate !== 'undefined' && order.createEndDate !== '' && order.createEndDate !== null) {
          ordersNew = orders.filter(item => {
            return Date.parse(order.createEndDate) >= Date.parse(item.createdAt);
          })
          orders = ordersNew;
        }
        if (order.updateStartDate !== 'undefined' && order.updateStartDate !== '' && order.updateStartDate !== null) {
          ordersNew = orders.filter(item => {
            return Date.parse(order.updateStartDate) <= Date.parse(item.updatedAt);
          })
          orders = ordersNew;
        }
        if (order.updateEndDate !== 'undefined' && order.updateEndDate !== '' && order.updateEndDate !== null) {
          ordersNew = orders.filter(item => {
            return Date.parse(order.updateEndDate) >= Date.parse(item.updatedAt);
          })
          orders = ordersNew;
        }
        if (ordersNew.length === 0) {
          resJson(res, httpStatus.OK, { message: 'No matching content found', orders: ordersNew });
        } else {
          resJson(res, httpStatus.OK, { orders: ordersNew });
        }
      })
      .catch(err => {
        resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err })
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
  }
}

/* 
    Searching existing products in cart
*/
exports.searchCartProducts = async (req, res) => {
  try {
    const searchField = req.query.search;
    const cartProducts = await CartProducts.findAll({
      where: {
        [Op.or]: {
          productTitle: {
            [Op.like]: '%' + searchField + '%'
          }
        }
      }
    });
    if (cartProducts.length > 0) {
      res.status(httpStatus.OK).send({ message: "Cart Products Data", cartProducts })
    } else {
      res.status(httpStatus.OK).send({ message: "No data found" })
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error.message });
  }
}

exports.changeStatus = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const body = req.body;
    const updatedOrder = await Orders.findOne({ where: { orderId: orderId } }).then(order => {
      return order.update(body);
    })
    if (updatedOrder) {
      return res.status(httpStatus.OK).json({
        message: "Successfully status changed",
        updatedOrder
      });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error.message });
  }
}

