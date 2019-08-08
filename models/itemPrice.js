var mongoose = require('mongoose')
var Schema = mongoose.Schema

var PriceRange = new Schema({
    range: {
        type: String,
        defaultValue: "0.00"
      },
      min: {
        type: Number,
        decimal: true,
        defaultValue: 0,
      },
      max: {
        type: Number,
        decimal: true,
        defaultValue: 0,
      }
})

module.exports = mongoose.model('PriceRange', PriceRange)

