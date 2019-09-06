const MappedModel = require('../models/stores-product-mapping'); // Stores/Products mapping model imported
const Products = require('../models/item'); // Products model imported
const httpStatus = require('http-status'); // Module to provide HTTP response codes
var amqp = require('amqplib/callback_api'); // Rabbitmq supporting library

const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format

// funtion for filter an array over the second array
let filterTwoArrays = (...args) => {
    args[0].filter(item => {
        return args[1].includes(item._id);
    })

    return args[0];
}

// sending message(products) to trinity based on number of stores
let sendMessage = (...args) => {
    amqp.connect('amqp://admin:AYa0dkyR9fEZBiGX2zZq@rabbitmq.ivfuture.internal', (err, connection) => {
        if (err) {
            console.log('Error while connecting to rabbitmq --->', err);
        } else {
            connection.createChannel((err, channel) => {
                if (err) {
                    console.log('Error while creating channel in rabbitmq --->', err);
                } else {
                    let queue = 'products_queue';
                    let msg = JSON.stringify({
                        stores: args[0],
                        products: args[1]
                    });

                    channel.assertQueue(queue, {
                        durable: true
                    });
              
                    args[0].map(item => {
                        channel.sendToQueue(queue, Buffer.from(msg), {
                            persistent: true
                        });
                    })
                }
            })
        }
    })
}

// Create mapping between stores and products
exports.createMapping = async (req, res, next) => {
    try {
        const body = req.body;

        const products = body.products;
        const stores = body.stores;

        const response = [];

        const allProducts = await Products.find({});

        const filteredProducts = filterTwoArrays(allProducts, products);

        sendMessage(stores, filteredProducts);

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
                resJson(res, httpStatus.OK, { message: 'Succesfully added mapped data' });
            })
            .catch(err => {
                return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", error: err });
            })
    } catch (err) {
        return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", error: err });
    }
}