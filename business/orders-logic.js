const httpStatus = require('http-status');
const Order = require('../models/order');

exports.updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const updates = req.body;
        Order.findById(orderId)
            .then((order) => {
                order.save(updates);
            }).then(result => {
                res.send(httpStatus.OK).json({ message: "Updated Order succesfully", result });
            })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}