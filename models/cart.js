var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cartProductsSchema = new Schema({
    currency: {
        type: String,
        required: true,
    },
    email: {
        type: Intl,
        trim: true
    },
    discount: {
        type: Boolean
    },
    currency: {
        type: String,
        required: true
    },
    productVendor: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
      },
})

module.exports = mongoose.model('CartProducts', cartProductsSchema)

