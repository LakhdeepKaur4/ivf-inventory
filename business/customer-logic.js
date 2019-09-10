const Customer = require('../models/customer');
const Addresses = require('../config/relations').addresses;
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
        console.log(body);
        await new Customer(body).save()
            .then(customer => {
                body.address.customerId = customer.customerId;
                Addresses.create(body.address);
            });
        return res.status(httpStatus.OK).json({ message: "Customer created successfully" });
    } catch (error) {
        console.log(error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error })
    }
};