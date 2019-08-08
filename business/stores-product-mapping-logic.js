const MappedModel = require('../models/stores-product-mapping');
const httpStatus = require('http-status');

exports.createMapping = async (req, res, next) => {
    const body = req.body;

    const products = body.products;
    const stores = body.stores;

    const response = [];

    const promise = await products.map(async item => {
        await MappedModel({
            product_id: item,
            stores: stores
        }).save((err, res) => {
            response.push(res);
        });
    })

    Promise.all(promise)
        .then(result => {
            res.json(response);
        })
}