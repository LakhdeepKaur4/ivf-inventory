const MappedModel = require('../models/stores-product-mapping');
const httpStatus = require('http-status');

exports.createMapping = (req, res, next) => {
    try {
        const body = req.body;

        const products = body.products;
        const stores = body.stores;

        const response = [];

        const promise = products.map(item => {
            MappedModel.findOne({ product_id: item }, (err, res) => {
                if (err) {
                    response.push(err);
                }
                else {
                    if (res === null) {
                        MappedModel({
                            product_id: item,
                            stores: stores
                        }).save((err, res) => {
                            response.push(res);
                        });
                    }
                    else {
                        let storesFound = [];
                        storesFound = [...res.stores, ...stores];

                        MappedModel.findOneAndUpdate({ product_id: item }, { stores: storesFound })
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