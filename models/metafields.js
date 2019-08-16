var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Metafield = new Schema({
    key: {
        type: String,
        max: 30,
    },
    namespace: {
        type: String,
        max: 20,
    },
    scope: {
        type: String,
    },
    value: {
        type: String,
    },
    valueType: {
        type: String,
    },
    description: {
        type: String,
    }
});


module.exports = mongoose.model('Metafield', Metafield)