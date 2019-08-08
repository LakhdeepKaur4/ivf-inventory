var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PriceRange = new Schema({
    product_id: {
        type: Schema,
        
    },
    stores: {
        type: Array,
        
    }
})

module.exports = mongoose.model('PriceRange', PriceRange)