const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var itemVariantSchema = new Schema({
  ancestors: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }],
  index: {
    type: Number,
  },
  isVisible: {
    type: Boolean,
    index: true,
    defaultValue: false
  },
  isDeleted: {
    type: Boolean,
    index: true,
    defaultValue: false
  },
  barcode: {
    type: String,
  },
  compareAtPrice: {
    type: Number,
    decimal: true,
    min: 0,
    defaultValue: 0.00
  },
  fulfillmentService: {
    type: String,
  },
  weight: {
    type: Number,
    min: 0,
    decimal: true,
    defaultValue: 0,
  },
  length: {
    type: Number,
    min: 0,
    decimal: true,
    defaultValue: 0
  },
  width: {
    type: Number,
    min: 0,
    decimal: true,
    defaultValue: 0
  },
  height: {
    type: Number,
    min: 0,
    decimal: true,
    defaultValue: 0
  },
  inventoryManagement: {
    type: Boolean,
    defaultValue: true,
  },
  inventoryPolicy: {
    type: Boolean,
    defaultValue: false,
  },
  lowInventoryWarningThreshold: {
    type: Number,
    min: 0,
    defaultValue: 0
  },
  inventoryQuantity: {
    type: Number,
    defaultValue: 0,
  },
  minOrderQuantity: {
    type: Number,
  },
  isLowQuantity: {
    type: Boolean,
  },
  isSoldOut: {
    type: Boolean,
  },
  price: {
    type: Number,
    decimal: true,
    defaultValue: 0.00,
    min: 0,
  },
  shopId: {
    type: String,
    index: true,
  },
  sku: {
    type: String,
  },
  type: {
    type: String,
    defaultValue: "variant"
  },
  taxable: {
    label: "Taxable",
    type: Boolean,
    defaultValue: true,
  },
  taxCode: {
    type: String,
    defaultValue: "0000",
  },
  taxDescription: {
    type: String,
  },
  title: {
    type: String,
    defaultValue: ""
  },
  optionTitle: {
    type: String,
    defaultValue: "Untitled Option"
  },
  metafields: {
    // type: [Metafield],
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    label: "Updated at",
    type: Date,
  },
  eventLog: {
    // type: [Event],
  },
  workflow: {
    // type: Workflow,
  },
  originCountry: {
    type: String,
  },
  isActive:{
    type: Boolean,
    defaultValue: true
  },
  variantPicture: {
    type: String
  },
  options: {
    type: ["ItemVariant"]
  },
});

module.exports = mongoose.model('ItemVariant', itemVariantSchema);