const Payments = require('../config/relations').payments; // Payments model imported
const Orders = require('../config/relations').orders; // Orders model imported
const Customers = require('../config/relations').customers; // Customers model imported

const httpStatus = require('http-status'); // Module to provide HTTP response codes

const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format

// Get all payments of the orders relational database
exports.getPayments = (req, res, next) => {
    try {
        Payments.findAll()
            .then(payments => {
                return resJson(res, httpStatus.OK, payments);
            })
            .catch(err => {
                return resJson(res, httpStatus.NOT_FOUND, { message: 'Please try again...', error: err });
            })
    } catch (err) {
        return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
    }
}