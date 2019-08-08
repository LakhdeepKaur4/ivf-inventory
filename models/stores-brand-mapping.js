var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoresBrandMap = new Schema({
    brand_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Brand',
        required: true
    },
    stores: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('StoresBrandMapping', StoresBrandMap);