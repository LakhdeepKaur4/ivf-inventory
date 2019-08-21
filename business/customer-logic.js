const Customer = require('../models/customer');
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
                    name: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    },
                    email: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    },
                    surname: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    },
                    storeId: {
                        [Sequelize.Op.like]: '%' + searchField + '%'
                    }
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

