var mongoose = require('mongoose');
var textSearch = require('mongoose-text-search');
var Schema = mongoose.Schema;


var categorySchema = new Schema({
  name: {
    type: String,
    index: true,
    // text:true,
    maxlength: 128,
    required: true,
    trim: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  categoryThumbnail: {
    type: String,
    default: ''
  },
  pageTitle: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    required: true,
    trim: true
  },
  search: {
    type: String
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null
  },
  status: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

categorySchema.plugin(textSearch);
// categorySchema.index({name: 'text'});
// categorySchema.index({'$**': 'text'});

module.exports = mongoose.model('Category', categorySchema)

