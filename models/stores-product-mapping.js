var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoresProductMap = new Schema({
    product_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Product',
        required: true
    },
    stores: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('StoresProductMapping', StoresProductMap);