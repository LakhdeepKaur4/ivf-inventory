var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoresCategoryMap = new Schema({
    category_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: true
    },
    stores: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('StoresCategoryMapping', StoresCategoryMap);