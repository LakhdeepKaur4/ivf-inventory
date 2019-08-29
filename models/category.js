var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

var categorySchema = new Schema({
  name: {
    type: String,
    index: true,
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

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Category', categorySchema)

