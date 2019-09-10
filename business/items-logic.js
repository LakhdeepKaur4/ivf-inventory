const Item = require('../models/item');
const ItemVariant = require('../models/itemVariant');
const httpStatus = require('http-status');
const helper = require('../helpers/user');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.create = async (req, res, next) => {
  try {
    let body = req.body;
    if (Object.entries(body).length === 0) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: "Item body is empty" })
    }
    const item = await new Item(body).save();
    const itemId = item._id;
    let itemsUrl = "../public/images/items/";
    // let variantsUrl = "../public/images/variants/";
    let index;
    console.log(body.pictures)
    if (body.pictures !== null && body.pictures != undefined) {
      body.pictures.map(async (picture, picIndex) => {
        index = picture.fileName.lastIndexOf('.');
        body.fileExt = picture.fileName.slice(index + 1);
        body.fileName = picture.fileName.slice(0, index);
        body.productPicture = picture.picture.split(',')[1];
        await helper.saveToDisc(itemsUrl, itemId, body.fileName, body.fileExt, body.productPicture, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);
            Item.update({ _id: itemId }, { $push: { productPicture: newPath } }, (err, resp) => {
              if (err) {
                console.error(err);
              }
              else return;
            });
          }
        })
      })
    }
    // if (body.variants) {
    //   body.variants.map(async (variant, variantIndex) => {
    //     const savedVariants = await new ItemVariant(variant).save();
    //     let setObject = {};
    //     setObject["variants." + variantIndex + ".ancestors"] = itemId;
    //     await ItemVariant.update({ _id: savedVariants._id }, { $addToSet: { ancestors: itemId } });
    //     await Item.update({ _id: itemId }, { $push: setObject });
    //     delete setObject["variants." + variantIndex + ".ancestors"];
    //     if (variant.pictures !== null && variant.pictures !== undefined && variant.pictures !== '') {
    //       variant.pictures.map(async (picture, picIndex) => {
    //         await helper.saveToDisc(variantsUrl, savedVariants._id, picture.fileName, picture.fileExt, picture.picture, (err, res) => {
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             let index = res.indexOf('../');
    //             let newPath = res.slice(index + 2, res.length);
    //             setObject["variants." + variantIndex + ".variantPicture"] = newPath;
    //             ItemVariant.update({ _id: savedVariants._id }, { $push: { variantPicture: newPath } }, (err, resp) => {
    //               if (err) console.error(err);
    //               else return;
    //             });
    //           }
    //         })
    //       })
    //     }
    //     setObject["variants." + variantIndex + ".options.0.ancestors"] = savedVariants._id;
    //     delete setObject["variants." + variantIndex + ".options.0.ancestors"];
    //     await ItemVariant.update({ _id: savedVariants._id }, { $push: { "options.0.ancestors": savedVariants._id } });
    //     await Item.update({ _id: itemId }, { $set: setObject }, { new: true });
    //     variant.options.map(async (option, optionIndex) => {
    //       if (option.pictures !== null && option.pictures !== undefined && option.pictures !== '') {
    //         option.pictures.map(async (picture, picIndex) => {
    //           await helper.saveToDisc(variantsUrl, savedVariants._id, picture.fileName, picture.fileExt, picture.picture, (err, res) => {
    //             if (err) {
    //               console.log(err);
    //             } else {
    //               let index = res.indexOf('../');
    //               let newPath = res.slice(index + 2, res.length);
    //               setObject["variants." + variantIndex + ".options." + optionIndex + ".picture"] = "";
    //               Item.update({ _id: itemId }, { $push: setObject }, (err, resp) => {
    //                 if (err) console.error(err);
    //                 else return;
    //               });
    //               setObject["variants." + variantIndex + ".options." + optionIndex + ".variantPicture"] = newPath;
    //               Item.update({ _id: itemId }, { $push: setObject }, (err, resp) => {
    //                 if (err) console.log(error);
    //                 else return;
    //               });
    //               setObject["options." + optionIndex + ".picture"] = "";
    //               ItemVariant.update({ _id: savedVariants._id }, { $set: setObject }, (err, resp) => {
    //                 if (err) console.error(err);
    //                 else return;
    //               });
    //               setObject["options." + optionIndex + ".variantPicture"] = newPath;
    //               ItemVariant.update({ _id: savedVariants._id }, { $push: setObject }, (err, resp) => {
    //                 if (err) console.error(err);
    //                 else return;
    //               });
    //             }
    //           });
    //         }
    //         )
    //       }
    //     })
    //   })
    // }
    return res.status(httpStatus.OK).json({ message: "Successfully product created", itemId: item._id, name: item.name });
  } catch (error) {
    console.log("error", error);
    return res.send(error);
  }
};

exports.getItems = async (req, res, next) => {
  try {
    console.log("getItems")
    const item = await Item.find({});
    if (item) {
      return res.json({ item });
    }
  } catch (error) {
    // console.log(error);
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

exports.updateItems = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId)
    let index;
    let body = req.body;
    console.log("update ", body)
    let itemsUrl = "../public/images/items/";
    let variantsUrl = "../public/images/variants/";
    console.log(body.pictures);
    if (body.pictures !== null && body.pictures != undefined) {
      body.productPicture = [];
      Item.update({ _id: itemId }, { $set: body }, (err, resp) => {
        if (err) console.error(err);
        else return;
      });
      body.pictures.map(async (picture, picIndex) => {
        if (!picture.fileName) {
          await Item.update({ _id: itemId }, { $push: { productPicture: picture } }, (err, resp) => {
            if (err) {
              console.error(err);
            }
            else return;
          });
          return;
        }
        let fileExt, fileName;
        index = picture.fileName.lastIndexOf('.');
        fileExt = picture.fileName.slice(index + 1);
        fileName = picture.fileName.slice(0, index);
        await helper.saveToDisc(itemsUrl, itemId, fileName, fileExt, picture.picture.split(',')[1], (err, res) => {
          if (err) {
            console.log(err);
          } else {
            let index = res.indexOf('../');
            let newPath = res.slice(index + 2, res.length);

            // console.log("newPath",newPath)
            body.productPicture.push(newPath);
            Item.update({ _id: itemId }, { $push: { productPicture: newPath } }, (err, resp) => {
              if (err) {
                console.error(err);
              }
              else return;
            });
          }
        })
      })
      console.log("after update", body)
    }
    if (body.variants) {
      body.variants.map(async (variant, variantIndex) => {
        const savedVariants = await new ItemVariant(variant).save();
        let setObject = {};
        setObject["variants." + variantIndex + ".ancestors"] = req.params.itemId;
        await ItemVariant.update({ _id: savedVariants._id }, { $addToSet: { ancestors: req.params.itemId } });
        await Item.update({ _id: req.params.itemId }, { $push: setObject });
        delete setObject["variants." + variantIndex + ".ancestors"];
        if (variant.pictures !== null && variant.pictures != undefined) {
          variant.pictures.map(async (picture, picIndex) => {
            // console.log("**")
            await helper.saveToDisc(variantsUrl, savedVariants._id, picture.fileName, picture.fileExt, picture.picture, (err, res) => {
              if (err) {
                console.log(err);
              } else {
                let index = res.indexOf('../');
                let newPath = res.slice(index + 2, res.length);
                setObject["variants." + variantIndex + ".variantPicture"] = newPath;
                // delete setObject["variants." + variantIndex + ".variantPicture"];
                Item.update({ _id: req.params.itemId }, { $push: setObject }, (err, resp) => {
                  if (err) console.error(err);
                  else return;
                });
                ItemVariant.update({ _id: savedVariants._id }, { $push: { variantPicture: newPath } }, (err, resp) => {
                  if (err) console.error(err);
                  else return;
                });
              }
            })
          })
        }
        if (variant.options) {
          setObject["variants." + variantIndex + ".options.0.ancestors"] = savedVariants._id;
          delete setObject["variants." + variantIndex + ".options.0.ancestors"];
          await ItemVariant.update({ _id: savedVariants._id }, { $push: { "options.0.ancestors": savedVariants._id } });
          await Item.update({ _id: req.params.itemId }, { $set: setObject }, { new: true });
          variant.options.map(async (option, optionIndex) => {
            if (option.pictures !== null && option.pictures !== undefined) {
              option.pictures.map(async (picture, picIndex) => {
                await helper.saveToDisc(variantsUrl, savedVariants._id, picture.fileName, picture.fileExt, picture.picture, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let index = res.indexOf('../');
                    let newPath = res.slice(index + 2, res.length);
                    setObject["variants." + variantIndex + ".options." + optionIndex + ".picture"] = "";
                    Item.update({ _id: req.params.itemId }, { $push: setObject }, (err, resp) => {
                      if (err) console.error(err);
                      else return;
                    });
                    setObject["variants." + variantIndex + ".options." + optionIndex + ".pictures"] = "";
                    Item.update({ _id: req.params.itemId }, { $push: setObject }, (err, resp) => {
                      if (err) console.error(err);
                      else return;
                    });
                    setObject["variants." + variantIndex + ".options." + optionIndex + ".variantPicture"] = newPath;
                    Item.update({ _id: req.params.itemId }, { $push: setObject }, (err, resp) => {
                      if (err) console.log(err);
                      else return;
                    });
                    setObject["options." + optionIndex + ".picture"] = "";
                    ItemVariant.update({ _id: savedVariants._id }, { $push: setObject }, (err, resp) => {
                      if (err) console.error(err);
                      else return;
                    });
                    setObject["options." + optionIndex + ".variantPicture"] = newPath;
                    ItemVariant.update({ _id: savedVariants._id }, { $push: setObject }, (err, resp) => {
                      if (err) console.error(err);
                      else return;
                    });
                  }
                });
              }
              )
            }
          })
        }
      })
    }
    Item.update({ _id: itemId }, { $set: body }, (err, item) => {
      if (err) console.error(err);
      else return res.status(httpStatus.OK).send({ message: "Item updated" });
    });

  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
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
    console.log("update item==");
    const itemId = req.params.itemId;
    let body = req.body;
    if (body.variants) {
      await Promise.all(body.variants.map(async (variant, variantIndex) => {
        let savedVariant;
        variant.ancestors = itemId;
        let options = variant.options;
        variant.options = [];

        if(variant._id){
          savedVariant = await ItemVariant.findOne(variant._id);
          if(!savedVariant){
            return;
          }
        }
        else{
          savedVariant = await new ItemVariant(variant).save();
          await Item.update({ _id: itemId }, { $push: {"variants":savedVariant} });
        }

         if (options) {
          await Promise.all(options.map(async (option, optionIndex) => {
            let savedOption;
            option.ancestors = savedVariant._id;
            if(option._id){
              savedOption = await ItemVariant.findOne(option._id);
              if(!savedOption){
                return;
              }
            }
            else{
              console.log(option);
              savedOption = await new ItemVariant(option).save();
              console.log("saved variants", savedVariant._id);
              await ItemVariant.update({ _id: savedVariant._id }, { $push: {"options":savedOption} });
            }
            // const savedVariants = await new ItemVariant(option).save();
            // setObject["variants." + variantIndex + ".options." + optionIndex + ".ancestors"] = savedVariants._id;
            // console.log("____",setObject)
            // await Item.update({ _id: itemId }, { $set: setObject }, { new: true }).exec();
            // delete setObject["variants." + variantIndex + ".options." + optionIndex + ".ancestors"];
            // setObject["options." + optionIndex + ".ancestors"] = savedVariants._id;
            // await ItemVariant.update({ _id: savedVariants._id }, { $set: setObject  }).exec();
          }))
        }
        
        
       
      }))
    }
    res.send("sent")
    // Item.update({ _id: itemId }, { $set: body }, (err, resp) => {
    //   if (err) console.error(err);
    //   return res.status(httpStatus.OK).send({ message: "Item Updated Page" });
    // });
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", message: error });
  }
}








