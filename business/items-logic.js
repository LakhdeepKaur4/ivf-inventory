const Item = require('../models/item');
const ItemVariant = require('../models/itemVariant');
const httpStatus = require('http-status');
const helper = require('../helpers/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.getItems = async (req, res, next) => {
  try {
    const item = await Item.find({});
    if (item) {
      return res.json({ item });
    }
  } catch (error) {
    return res.send(error);
  }
}

exports.getItemById = async (req, res, next) => {
  try {
    const item = await Item.findOne({ _id: req.params.itemId });
    if (item) {
      return res.json({ item });
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

exports.getVariantsByProductId = async (req, res, next) => {
  try {
    let item = await ItemVariant.find({ 'ancestors': { $in: [ObjectId(req.params.id)] } }, { new: true }).populate("ancestors", "sku").exec((err, resp) => {
      if (err) console.log(err);
      else return;
    });
    if (item) {
      return res.status(httpStatus.OK).send({ message: "Item Page", item });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error.message });
  }
}

exports.deleteItems = async (req, res, next) => {
  try {
    let item = await Item.findByIdAndUpdate({ _id: req.params.id }, { $set: { isActive: false } }, { new: true });
    let itemVariant = await Item.findByIdAndUpdate({ _id: req.params.id }, { $set: { isActive: false } }, { new: true });
    if (item && itemVariant) {
      return res.status(httpStatus.OK).send({ message: "Item successfully deleted", item });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.updateVariant = async (req, res, next) => {
  try {
    let itemVariant = await ItemVariant.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (itemVariant) {
      return res.status(httpStatus.OK).send({ message: "Item variant updated", itemVariant });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.deleteVariants = async (req, res, next) => {
  try {
    let item = await Item.findByIdAndUpdate({ _id: req.params.id }, { $set: { isActive: false } }, { new: true });
    if (item) {
      return res.status(httpStatus.OK).send({ message: "Item successfully deleted", item });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.getProductByBrand = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    const item = await Item.find({ brandId: brandId });
    if (item) {
      return res.status(httpStatus.OK).send({ message: "Item by brand page", item });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.getProductByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    console.log(categoryId)
    let category = await Item.find({ 'category': { $in: [categoryId] } }, { new: true }).select({ "name": 1, "shopId": 1, "description": 1, "variants": 1, "productType": 1, "originCountry": 1 }).populate('category', 'name');
    if (category) {
      return res.status(httpStatus.OK).send({ message: "Item by category page", item: category });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error.message });
  }
}

// Getting all items but segregated by pages
exports.getItemsByPage = (req, res, next) => {
  try {
    Item.paginate({}, { page: req.params.pageNumber, limit: parseInt(req.params.limit) })
      .then(items => {
        return res.status(httpStatus.OK).json({ items });
      })
      .catch(err => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
      })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

/* 
    Searching existing category
*/
exports.searchItems = async (req, res) => {
  try {
    const searchField = req.query.search;
    const items = await Item.find({
      "name": { "$regex": '^' + searchField, "$options": 'i' }
    });
    if (items) {
      return res.status(httpStatus.OK).json(items);
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error.message });
  }
}


exports.getItemsByIds = async (req, res, next) => {
  try {
    const ids = req.query.ids;
    let item = await Item.find({ '_id': { $in: ids } }).exec((err, resp) => {
      if (err) console.log(err);
      else return;
    });
    if (item) {
      return res.status(httpStatus.OK).send({ message: "Item Page", item });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error.message });
  }
}


exports.createItems = async (req, res, next) => {
  try {
    let body = req.body;
    if (Object.entries(body).length === 0) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Item body is empty" })
    }
    const item = await new Item(body).save();
    if (item) {
      return res.status(httpStatus.OK).send({ message: "Item Page", item });
    }
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error });
  }
}

exports.updateItems = async (req, res, next) => {
  try {
    let itemId = req.params.itemId;
    let body = req.body;
    Item.update({ _id: itemId }, { $set: body }, async (err, resp) => {
      let item = await Item.findOne({_id:itemId});   
      if(item.variants){
        item.variants.map(variant=>{
          variant.ancestors = [item._id];
          if(variant.options){
            variant.options.map(option=>{
              if(!option._id){
                option._id = new ObjectId()
              }
              option.ancestors = [variant._id];
            });
          }
        });
      }

      Item.update({ _id: itemId }, { $set: item }, async (err, resp) =>{
        if(err)
          return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error });
        return res.status(httpStatus.OK).send({ message: "Item Updated Page" });
      });
      
      if (err) 
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error });
    });

  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error });
  }
}








