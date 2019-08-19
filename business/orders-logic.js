const httpStatus = require('http-status');
const Order = require('../models/order');

exports.updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const updates = req.body;
        Order.update(orderId, {
            $set: updates
        }, (err, order) => {
            if (err) {
                return res.json({ message: 'Updation error', err });
            } else {
                return res.status(httpStatus.OK).send({ message: "Order updated", order });
            }
        })
    } catch (error) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

