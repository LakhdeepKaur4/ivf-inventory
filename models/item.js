var mongoose = require('mongoose');
var Schema = mongoose.Schema
const Price = require('./itemPrice');
const PriceRange = mongoose.model("PriceRange").schema;
const variant = require('./itemVariant');
const ItemVariant = mongoose.model('ItemVariant').schema;

var itemSchema = new Schema({
  name: {
    type: String,
    index: true,
    maxlength: 128,
    required: true,
    trim: true
  },
  ancestors: {
    type: Array,
    defaultValue: []
  },
  shopId: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  pageTitle: {
    type: String,
  },
  productType: {
    type: String,
  },
  originCountry: {
    type: String,
  },
  type: {
    type: String,
    defaultValue: "simple"
  },
  vendor: {
    type: String,
  },
  metafields: {
    type: Array,
  },
  positions: {
    type: Object,
  },
  price: {
    type: [PriceRange]
  },
  isLowQuantity: {
    type: Boolean,
  },
  isSoldOut: {
    type: Boolean,
  },
  isBackorder: {
    type: Boolean,
  },
  requiresShipping: {
    type: Boolean,
    defaultValue: true,
  },
  parcel: {
    // type: ShippingParcel,
  },
  hashtags: {
    type: Array,
    index: true
  },
  twitterMsg: {
    type: String,
    maxlength: 140,
  },
  facebookMsg: {
    type: String,
    maxlength: 255,
  },
  googleplusMsg: {
    type: String,
    maxlength: 255,
  },
  pinterestMsg: {
    type: String,
    maxlength: 255,
  },
  metaDescription: {
    type: String,
  },
  handle: {
    type: String,
    index: true,
  },
  isDeleted: {
    type: Boolean,
    index: true,
    defaultValue: false
  },
  isVisible: {
    type: Boolean,
    index: true,
    defaultValue: false
  },
  template: {
    type: String,
    defaultValue: "productDetailSimple"
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  publishedAt: {
    type: Date,
  },
  publishedScope: {
    type: String,
  },
  workflow: {
    // type: Workflow,
  },
  minStockReq: {
    type: String,
    required: true,
    trim: true
  },
  optStock: {
    type: Number,
    required: true,
    trim: true
  },
  units: {
    type: String,
    required: true,
    trim: true
  },
  unitsType: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  lossCost: {
    type: Number,
    required: true,
    trim: true
  },
  variants: {
    type: [ItemVariant]
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true
  }
})

module.exports = mongoose.model('Item', itemSchema)

