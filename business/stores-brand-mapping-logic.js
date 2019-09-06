const MappedModel = require('../models/stores-brand-mapping'); // Stores/Brands mapping model imported
const httpStatus = require('http-status'); // Module to provide HTTP response codes

const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format


// Create mapping between stores and brands
exports.createMapping = (req, res, next) => {
    try {
        const body = req.body;

        const brands = body.brands;
        const stores = body.stores;

        const response = [];

        const promise = brands.map(item => {
            MappedModel.findOne({ brand_id: item }, (err, res) => {
                if (err) {
                    response.push(err);
                }
                else {
                    if (res === null) {
                        MappedModel({
                            brand_id: item,
                            stores: stores
                        }).save((err, res) => {
                            response.push(res);
                        });
                    }
                    else {
                        let storesFound = [];
                        storesFound = [...res.stores, ...stores];

                        MappedModel.findOneAndUpdate({ brand_id: item }, { stores: storesFound })
                            .then(res => {
                                response.push(res);
                            })
                    }
                }
            });
        })


        Promise.all(promise)
            .then(result => {
                resJson(res, httpStatus.OK, { message: 'Succesfully added mapped data' });
            })
            .catch(err => {
                return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", error: err });
            })
    } catch (err) {
        return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", error: err });
    }
}