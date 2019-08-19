var mongoose = require('mongoose');
Schema = mongoose.Schema;

const ShippingParcel = new Schema({
    containers: {
        type: String
    },
    length: {
        type: Number,
        decimal: true
    },
    width: {
        type: Number,
        decimal: true
    },
    height: {
        type: Number,
        decimal: true
    },
    weight: {
        type: Number,
        decimal: true
    }
})

module.exports = mongoose.model('ShippingParcel', ShippingParcel);