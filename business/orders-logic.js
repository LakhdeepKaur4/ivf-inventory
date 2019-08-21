const Orders = require('../config/relations').orders;
const Customers = require('../config/relations').customers;
const Carts = require('../config/relations').carts;
const CartProducts = require('../config/relations').cartProducts;
const Addresses = require('../config/relations').addresses;
const Payments = require('../config/relations').payments;
const Shipments = require('../config/relations').shipments;

const httpStatus = require('http-status');

exports.getOrders = (req, res, next) => {
  Orders.findAll({
    include: [
      { model: Customers, include: [{ model: Addresses }] },
      { model: Carts, include: [{ model: CartProducts }] },
      { model: Shipments },
      { model: Payments }
    ]
  })
    .then(orders => {
      console.log(orders);
      res.json(orders);
    })
}

exports.getOrderById = (req, res, next) => {
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
      console.log(orders);
      res.json(orders);
    })
}

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
                                return res.status(httpStatus.OK).json({ order });
                              })
                          })
                      })
                  })
              })
          })
      })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const updates = req.body
        const updatedOrder = await Orders.findOne({ where: { orderId: orderId } }).then(relation => {
            return relation.update(updates)
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

