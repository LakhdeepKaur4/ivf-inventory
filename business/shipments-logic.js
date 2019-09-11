const Shipments = require('../config/relations').shipments; // Shipments model imported
const Addresses = require('../config/relations').addresses; // Addresses model imported
const Customers = require('../config/relations').customers; // Customers model imported
const Orders = require('../config/relations').orders; // Orders model imported

const httpStatus = require('http-status'); // Module to provide HTTP response codes

const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format

exports.getShipments = (req, res, next) => {
    try {
        Shipments.findAll({
            include: [
                {
                    model: Addresses, include: [
                        {
                            model: Customers
                        }
                    ]
                }
            ]
        })
            .then(shipments => {
                return resJson(res, httpStatus.OK, shipments);
            })
            .catch(err => {
                return resJson(res, httpStatus.NOT_FOUND, { message: 'Please try again...', error: err });
            })
    } catch (err) {
        return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: 'Please try again...', error: err });
    }
}