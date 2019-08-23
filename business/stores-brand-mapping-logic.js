const MappedModel = require('../models/stores-brand-mapping'); // Stores/Brands mapping model imported
const httpStatus = require('http-status'); // Module to provide HTTP response codes

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
                res.status(httpStatus.OK).json({
                    message: 'Succesfully added mapped data'
                });
            })
            .catch(err => {
                return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
            })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
    }
}