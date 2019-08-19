const Item = require('../models/item');
const ItemVariant = require('../models/itemVariant');
const httpStatus = require('http-status');
const helper = require('../helpers/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.createItems = async (req, res, next) => {
  try {
    let body = req.body;
    const item = await new Item(body).save();
    const itemId = item._id;
    let itemsUrl = "../public/images/items/";
    let variantsUrl = "../public/images/variants/";
    let index;
    if (body.picture !== null && body.picture != undefined) {
      index = body.fileName.lastIndexOf('.');
      body.fileExt = body.fileName.slice(index + 1);
      body.fileName = body.fileName.slice(0, index);
      body.picture = body.picture.split(',')[1];
      await helper.saveToDisc(itemsUrl, itemId, body.fileName, body.fileExt, body.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          Item.update({ _id: itemId }, { $set: { productPicture: newPath } }, (err, resp) => {
            if (err) console.error(err);
            else console.log(resp)
          });
        }
      })
    }
    body.variants.map(async (variant, index) => {
      const savedVariants = await new ItemVariant(variant).save();
      let setObject = {};
      setObject["variants." + index + ".ancestors"] = itemId;
      await ItemVariant.update({ _id: savedVariants._id }, { $addToSet: { ancestors: itemId } });
      await Item.update({ _id: itemId }, { $push: setObject });
      delete setObject["variants." + index + ".ancestors"];
      if (variant.options.picture !== null && variant.options.picture != undefined) {
        await helper.saveToDisc(variantsUrl, savedVariants._id, body.fileName, body.fileExt, body.picture, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);
            setObject["variants." + index + ".variantPicture"] = newPath;
            ItemVariant.update({ _id: savedVariants._id }, { $set: { variantPicture: newPath } }, (err, resp) => {
              if (err) console.error(err);
              else console.log(resp);
            });
          }
        })
      }
      setObject["variants." + index + ".options.0.ancestors"] = savedVariants._id;
      await ItemVariant.update({ _id: savedVariants._id }, { $push: { "options.0.ancestors": savedVariants._id } });
      await Item.update({ _id: itemId }, { $set: setObject }, { new: true });
      if (variant.options.picture !== null && variant.options.picture != undefined) {
        await helper.saveToDisc(variantsUrl, savedVariants._id, variant.options.fileName, variant.options.fileExt, variant.options.picture, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);
            setObject["variants." + index + ".options.0.variantPicture"] = newPath;
            ItemVariant.update({ _id: savedVariants._id }, { $set: { "options.0.variantPicture": newPath } }, (err, resp) => {
              if (err) console.error(err);
              else console.log(resp);
            });
          }
        })
      }
    })
    return res.status(httpStatus.OK).json({ message: "Successfully product created" });
  } catch (error) {
    return res.send(error);
  }
};

exports.getItems = async (req, res, next) => {
  try {
    const item = await Item.find({});
    console.log(item)
    if (item) {
      return res.send({ item });
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

exports.updateItems = async (req, res, next) => {
  try {
    let index;
    let body = req.body;
    let itemsUrl = "../public/images/items/";
    let variantsUrl = "../public/images/variants/";
    if (body.picture !== null && body.picture != undefined) {
      index = body.fileName.lastIndexOf('.');
      body.fileExt = body.fileName.slice(index + 1);
      body.fileName = body.fileName.slice(0, index);
      body.picture = body.picture.split(',')[1];
      await helper.saveToDisc(itemsUrl, req.params.itemId, body.fileName, body.fileExt, body.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          body.profilePicture = newPath;
          Item.update({ _id: req.params.itemId }, { $set: body }, (err, resp) => {
            if (err) console.error(err);
            else console.log(resp);
          });
        }
      })
    }
    body.variants.map(async (variant, index) => {
      // const savedVariants = await new ItemVariant(variant).save();
      let setObject = {};
      setObject["variants." + index + ".ancestors"] = req.params.id;
      await ItemVariant.update({ _id: variant._id }, { $addToSet: { ancestors: req.params.itemId } });
      await Item.update({ _id: req.params.itemId }, { $push: setObject });
      delete setObject["variants." + index + ".ancestors"];
      if (variant.options.picture !== null && variant.options.picture != undefined) {
        await helper.saveToDisc(variantsUrl, variant._id, body.fileName, body.fileExt, body.picture, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);
            setObject["variants." + index + ".variantPicture"] = newPath;
            ItemVariant.update({ _id: variant._id }, { $set: { variantPicture: newPath } }, (err, resp) => {
              if (err) console.error(err);
              else console.log(resp);
            });
          }
        })
      }
      setObject["variants." + index + ".options.0.ancestors"] = variant._id;
      await ItemVariant.update({ _id: variant._id }, { $push: { "options.0.ancestors": variant._id } });
      await Item.update({ _id: req.params.itemId }, { $set: setObject }, { new: true });
      if (variant.options.picture !== null && variant.options.picture != undefined) {
        await helper.saveToDisc(variantsUrl, variant._id, variant.options.fileName, variant.options.fileExt, variant.options.picture, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);
            setObject["variants." + index + ".options.0.variantPicture"] = newPath;
            ItemVariant.update({ _id: variant._id }, { $set: { "options.0.variantPicture": newPath } }, (err, resp) => {
              if (err) console.error(err);
              else console.log(resp);
            });
          }
        })
      }
      setObject["variants." + index + ".options.0.ancestors"] = variant._id;
      await ItemVariant.update({ _id: variant._id }, { $push: { "options.0.ancestors": variant._id } });
      await Item.update({ _id: req.params.itemId }, { $set: setObject }, { new: true });
      if (variant.options.picture !== null && variant.options.picture != undefined) {
        await helper.saveToDisc(variantsUrl, variant._id, variant.options.fileName, variant.options.fileExt, variant.options.picture, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);
            setObject["variants." + index + ".options.0.variantPicture"] = newPath;
            ItemVariant.update({ _id: savedVariants._id }, { $set: { "options.0.variantPicture": newPath } }, (err, resp) => {
              if (err) console.error(err);
              else console.log(resp);
            });
          }
        })
      }
    })
    // let item = await Item.findByIdAndUpdate(req.params.itemId, { $set: req.body }, { new: true });
    // if (item) {
    return res.status(httpStatus.OK).send({ message: "Item updated" });
    // }
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.getVariantsByProductId = async (req, res, next) => {
  try {
    // console.log("****");
    let itemVariant = await ItemVariant.find({ 'ancestors': { $in: [ObjectId(req.params.id)] } }, { new: true }).populate("ancestors");
    if (itemVariant) {
      return res.status(httpStatus.OK).send({ message: "Item Variant Page", itemVariant });
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
    console.log(categoryId);
    let category = await Item.find({ 'category': { $in: [ObjectId(categoryId)] } }, { new: true }).populate("item");
    if (category) {
      return res.status(httpStatus.OK).send({ message: "Item by category page", item:category });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}


