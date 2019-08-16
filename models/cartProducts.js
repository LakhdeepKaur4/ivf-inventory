var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cartSchema = new Schema({
    sku: {
        type: String,
        index: true,
        required: true,
        trim: true
    },
    quantity: {
        type: Intl,
        trim: true
    },
    price: {
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
    cartId:{
        type: Schema.Types.ObjectId,
        ref: "Cart",
    },
})

module.exports = mongoose.model('Cart', cartSchema)

