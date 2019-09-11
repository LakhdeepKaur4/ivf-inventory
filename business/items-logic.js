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
    const itemId = req.params.itemId;
    // console.log(req.body)
    let body = req.body;
    if (body.variants) {
      await Promise.all(body.variants.map(async (variant, variantIndex) => {
        let savedVariant;
        variant.ancestors = itemId;
        let options = variant.options;
        variant.options = [];

        if (variant._id) {
          console.log("__", variant._id);
          savedVariant = await ItemVariant.findOne(variant._id);
          if (!savedVariant) {
            return;
          }
        }
        else {
          savedVariant = await new ItemVariant(variant).save();
          await Item.update({ _id: itemId }, { $push: { "variants": savedVariant } });
        }

        if (options) {
          await Promise.all(options.map(async (option, optionIndex) => {
            let savedOption;
            option.ancestors = savedVariant._id;
            if (option._id) {
              savedOption = await ItemVariant.findOne(option._id);
              if (!savedOption) {
                return;
              }
            }
            else {
              savedOption = await new ItemVariant(option).save();
              await ItemVariant.update({ _id: savedVariant._id }, { $push: { "options": savedOption } });
              await Item.update({ _id: itemId }, {
                $push: {
                  ["variants." + variantIndex + ".options"]: savedOption
                }
              });
            }
          }))
        }
      }))
    }
    Item.update({ _id: itemId }, { $set: body }, (err, resp) => {
      if (err) console.error(err);
      return res.status(httpStatus.OK).send({ message: "Item Updated Page" });
    });
    // return res.status(httpStatus.OK).send({ message: "Item Updated Page" });

  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error });
  }
}








