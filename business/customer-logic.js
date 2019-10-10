const Customer = require('../models/customer');
const Addresses = require('../config/relations').addresses;
const CartProducts = require('../config/relations').cartProducts; // CartProducts model imported
const Shipments = require('../config/relations').shipments; // Shipments model imported
const Orders = require('../config/relations').orders;
const httpStatus = require('http-status');
const Sequelize = require('sequelize');
/* 
    Searching existing customer
*/
exports.searchCustomer = async (req, res) => {
    try {
        const searchField = req.query.search;
        const customer = await Customer.findAll({
            where: {
                [Sequelize.Op.or]: {
                    firstname: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    },
                    email: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    },
                    lastname: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    },
                    storeId: searchField
                }
            }
        });
        if (customer.length > 0) {
            res.status(httpStatus.OK).send({ message: "Customer Data", customer })
        } else {
            res.status(httpStatus.OK).send({ message: "No data found" })
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error.message });
    }
}

/* 
    Creating customer
*/
exports.createCustomer = async (req, res, next) => {
    try {
        let body = req.body;
        await new Customer(body).save()
            .then(customer => {
                body.customerId = customer.customerId;
                body.address1 = body.address;
                body.type = 'address';
                Addresses.create(body);
                return res.status(httpStatus.OK).json({ message: "Customer created successfully", customer });
            });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
};

/* 
    Updating customer
*/
exports.updateCustomer = async (req, res, next) => {
    try {
        const customerId = req.params.customerId;
        let body = req.body;
        const updatedCustomer = await Customer.findOne({ where: { customerId: customerId } }).then(customer => {
            return customer.update(body);
        })
        if (updatedCustomer) {
            return res.status(httpStatus.OK).json({ message: "Customer updated successfully" });
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
};

/* 
  Add billing address of customer
*/
exports.addBillingAddressofCustomer = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const customerId = req.params.customerId;
        const existingAddress = await Addresses.findOne({ where: { customerId: customerId } });
        const { dataValues } = existingAddress;
        delete dataValues.addressId;
        dataValues.type = 'billing';
        const newAddress = await Addresses.create(dataValues);
        const updatedOrder = await Orders.update({ customerId: customerId }, { where: { orderId: orderId } })
        if (newAddress && updatedOrder) {
            return res.status(httpStatus.OK).json({ message: "Address updated successfully" });
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
};

exports.updateQuantityInCartProducts = async (req, res, next) => {
    try {
        console.log("____")
        const cartProductId = req.params.cartProductId;
        const updatedCartProducts = await CartProducts.update({ quantity: req.body.quantity }, { where: { cartProductId: cartProductId } });
        if (updatedCartProducts) {
            return res.status(httpStatus.OK).json({ message: "Updated cart products successfully" });
        }
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
}

exports.addProductsToExistingCart = async (req, res, next) => {
    try {
        const body = req.body;
        body['SKU'] = body.Sku;
        body['price'] = body.price.range;
        body['productVendor'] = body.vendor;
        body['productTitle'] = body.name;
        console.log(body);
        const products = await new CartProducts(body).save();
        // CartProducts.findOrCreate({
        // 	where: {
        // 		cartProductId: body.cartProductId,
        // 	},
        // 	defaults: body
        // })
        // 	.spread((product, created) => {
        // 		if (created) {
        // 			return res.status(httpStatus.CREATED).json({ message: "Product added successfully!" });
        // 		} else {
        // 			res.status(httpStatus.UNP  ROCESSABLE_ENTITY).json({ message: 'Product Already Exists' });
        // 		}
        // 	})
        // 	.catch(err => {
        // 		console.log("err ===>", err.name)
        // 		res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        // 			status: 500,
        // 			message: err.name
        // 		});  
        // 	})
        if (products) {
            return res.status(httpStatus.OK).json({ message: "Updated cart products successfully" });
        }
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
}

exports.updateExistingAddresses = async (req, res, next) => {
    try {
        const orderId = req.params.orderId;
        const body = req.body;
        const order = await Orders.findOne({ where: { orderId: orderId } });
        const { dataValues } = order;
        let customerId = dataValues.customerId;
        let shipmentId = dataValues.shipmentId;
        if (body.billingAddress) {
            await Addresses.update(body.billingAddress, { where: { customerId: customerId } });
        }
        if (body.shippingAddress) {
            const shipment = await Shipments.findOne({ where: { shipmentId: shipmentId } });
            const { dataValues } = shipment;
            await Addresses.update(body.shippingAddress, { where: { addressId: dataValues.addressId } });
        }
        return res.status(httpStatus.OK).json({ message: "Addresses updated successfully" });
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
}