const Item = require('../models/item');
const ItemVariant = require('../models/itemVariant');
const httpStatus = require('http-status');

exports.createItems = async (req, res, next) => {
  try {
    let body = req.body;
    const item = await new Item(body).save();
    const itemId = item._id;
    let itemsUrl;
    let variantsUrl = "../public/images/variants";;
    let index;
    if (body.picture && body.fileName && body.fileExt) {
      itemsUrl = "../public/images/items/";
      let index = body.fileName.lastIndexOf('.');
      body.fileExt = body.fileName.slice(index + 1);
      body.fileName = body.fileName.slice(0, index);
      body.picture = body.picture.split(',')[1];
      helper.saveToDisc(itemsUrl, itemId, body.fileName, body.fileExt, body.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          Item.update({ _id: itemId }, { $set: { productPicture: newPath } }, function (err, updated) {
            if (err) {
              console.log(err)
            } else {
              console.log(updated)
            }
          })
        }
      })
    }
    body.variants.map(async (variant, index) => {
      const savedVariants = await new ItemVariant(variant).save();
      let setObject = {};
      setObject["variants." + index + ".ancestors"] = itemId;
      await ItemVariant.update({ _id: savedVariants._id }, { $addToSet: { ancestors: itemId } });
      helper.saveToDisc(variantsUrl, savedVariants._id, variant.fileName, variant.fileExt, variants.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          setObject["variants." + index + ".variantPicture"] = newPath
          ItemVariant.update({ _id: itemId }, { $set: setObject }, function (err, updated) {
            if (err) {
              console.log(err)
            } else {
              console.log("updated")
            }
          })
        }
      });
      await Item.update({ _id: itemId }, { $push: setObject });
      delete setObject["variants." + index + ".ancestors"];
      setObject["variants." + index + ".options.0.ancestors"] = savedVariants._id;
      await ItemVariant.update({ _id: savedVariants._id }, { $push: { "options.0.ancestors": savedVariants._id } });
      helper.saveToDisc(variantsUrl, savedVariants._id, variant.options.fileName, variant.options.fileExt, variants.options.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          setObject["variants." + index + ".variantPicture"] = newPath
          ItemVariant.update({ _id: itemId }, { $set: setObject }, function (err, updated) {
            if (err) {
              console.log(err)
            } else {
              console.log("updated")
            }
          })
        }
      });
      await Item.update({ _id: itemId }, { $push: setObject }, { new: true });
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
    let item = await Item.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (item) {
      return res.status(httpStatus.OK).send({ message: "Item updated", item });
    }
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.deleteItems = async (req, res, next) => {
  try {
    let item = await Item.findByIdAndUpdate({ _id: req.params.id }, { $set: { isActive: false } }, { new: true });
    if (item) {
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

// let upsertItem = (_item) => {
//   if (_item._id) return Item.update({ _id: _item._id }, _item)
//   return new Item(_item)
//     .save()
// }

// let getItems = () => (console.log("finding"))

// let removeItem = (query) => (Item.remove(query))

// function ItemsLogic() {
//   return {
//     upsertItem,
//     getItems,
//     removeItem
//   }
// }
// module.exports = ItemsLogic
