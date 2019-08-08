var mongoose = require('mongoose')
var Schema = mongoose.Schema

var brandsSchema = new Schema({
    name: {
        type: String,
        index: true,
        maxlength: 128,
        required: true,
        trim: true
    },
    products_quantity: {
        type: Intl,
        trim: true
    },
    status: {
        type: Boolean
    },
    description: {
        type: String,
        required: true
    },
    logo_url: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Brands', brandsSchema)

