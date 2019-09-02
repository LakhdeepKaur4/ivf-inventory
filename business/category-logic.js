const Category = require('../models/category');
const Item = require('../models/item');
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const helper = require('../helpers/user');
const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format

exports.createCategory = async (req, res, next) => {
  try {
    let body = req.body;
    const category = await new Category(body).save();
    const categoryId = category._id;
    let url = "../public/images/categoryThumbnails/";
    let index = body.fileName.lastIndexOf('.');
    body.fileExt = body.fileName.slice(index + 1);
    body.fileName = body.fileName.slice(0, index);
    body.picture = body.picture.split(',')[1];
    await helper.saveToDisc(url, categoryId, body.fileName, body.fileExt, body.picture, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let index = res.indexOf('../');
        let newPath = res.slice(index + 2, res.length);
        Category.update({ _id: categoryId }, { $set: { categoryThumbnail: newPath } }, function (err, updated) {
          if (err) {
            console.log(err)
          } else {
           return;
          }
        })
      }
    })
    return res.status(httpStatus.OK).json({ message: "Successful category created" });
  } catch (error) {
    return res.send(error);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({}).then(categories => {
      const categoryIdToObjMap = {};
      categories.forEach(category => {
        categoryIdToObjMap[category._id] = { ...category._doc, items: [] };
      });
      return categoryIdToObjMap;
    }).then((categoryIdToObjMap) => {
      return Item.find({}).then(items => {
        items.forEach(item => {
          if (item.category) {
            item.category.forEach(categoryId => {
              if (categoryIdToObjMap[categoryId]) {
                categoryIdToObjMap[categoryId].items.push(item.sku, item.optStock);
              }
            });
          }
        });
        return Object.values(categoryIdToObjMap)
        // .map(category => {
        //   return {
        //     ...category, count: category.items.length
        //   }
        // });
      });
    });
    if (categories) {
      return res.status(httpStatus.OK).send({ categories });
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

exports.getInitialCategory = async (req, res, next) => {
  try {
    const category = await Category.find({ parent: null });
    if (category) {
      return res.send({ category });
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

exports.getParticularCategory = async (req, res, next) => {
  try {
    const parent = req.params.id;
    // const category = await Category.aggregate([{$match:{$or:[{_id:ObjectId(parent)},{parent:ObjectId(parent)}]}}]);
    const category = await Category.aggregate({
      $match: { parent: ObjectId(parent) }
      // $match: {$and:[{ parent: ObjectId(parent) },{isActive:true}]}
    },
      {
        $project: { _id: false, data: { id: '$_id', name: '$name' }, parent: '$parent' }
      },
      {
        $project: {
          id: { $literal: 'id' },
          mainCategory: {
            $cond: [{ $eq: [null, '$parent'] }, { _id: '$data.id', name: '$data.name', parent: '$parent' }, undefined]
          },
          subcat: {
            $cond: [{ $ne: [null, '$parent'] }, { _id: '$data.id', name: '$data.name', parent: '$parent' }, null]
          }
        }
      },
      {
        $group: {
          _id: '$id',
          mainCategory: { $max: '$mainCategory' },
          subCategories: {
            $addToSet: '$subcat'
          }
        }
      },
      {
        $project: {
          _id: false,
          mainCategory: 1,
          subCategories: {
            $setDifference: ['$subCategories', [null]]
          }
        },
      }).cursor().exec()
      .toArray(function (err, data) {
        res.status(httpStatus.OK).json(data);
      });;
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
}

exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id }).populate({
      path: 'parent', populate: { path: 'parent' }
    });
    if (category) {
      return res.send({ category });
    }
  } catch (error) {
    return res.send(error);
  }
}

exports.testCategory = async (req, res, next) => {
  try {
    const category = await Category.aggregate([{
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parent",
        as: "subCategory"
      }
    }])
    if (category) {
      res.send(category);
    }
  } catch (error) {
    return res.send(error);
  }
}

exports.updateCategory = async (req, res, next) => {
  try {
    const body = req.body;
    console.log("**", body)
    if (req.body.picture !== undefined && req.body.picture !== null && req.body.fileName !== undefined && req.body.fileName !== null && req.body.fileName !== '' && req.body.picture !== '') {
      let index = body.fileName.lastIndexOf('.');
      body.fileExt = body.fileName.slice(index + 1);
      body.fileName = body.fileName.slice(0, index);
      body.picture = body.picture.split(',')[1];
      await helper.saveToDisc(req.params.id, body.fileName, body.fileExt, body.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          Category.update({ _id: req.params.id }, { $set: { categoryThumbnail: newPath } }, function (err, updated) {
            if (err) {
              console.log(err);
            } else {
              console.log(updated);
            }
          })
        }
      })
    }
    else {
      Category.findOneAndUpdate({ _id: req.params.id }, {
        $set: body
      }, (err, category) => {
        if (err) {
          return res.json({ message: 'Updation error', err });
        } else {
          return res.status(httpStatus.OK).send({ message: "Category updated", category });
        }
      })
    }

  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

exports.deleteCategory = async (req, res, next) => {
  try {
    let updateObj = {
      isActive: false
    }
    let category = await Category.findByIdAndUpdate({ _id: req.params.id }, updateObj, { new: true });
    if (category) {
      return res.status(httpStatus.OK).send({ message: "Category successfully deleted", category });
    }
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error });
  }
}

/* 
    Searching existing category
*/
exports.searchCategory = async (req, res) => {
  try {
    const searchField = req.query.search;
    const category = await Category.find({
      "name": { "$regex": '^' + searchField, "$options": 'i' }
    }).then(categories => {
      const categoryIdToObjMap = {};
      categories.forEach(category => {
        categoryIdToObjMap[category._id] = { ...category._doc, items: [] };
      });
      return categoryIdToObjMap;
    }).then((categoryIdToObjMap) => {
      return Item.find({}).then(items => {
        items.forEach(item => {
          if (item.category) {
            item.category.forEach(categoryId => {
              if (categoryIdToObjMap[categoryId]) {
                categoryIdToObjMap[categoryId].items.push(item.sku, item.optStock);
              }
            });
          }
        });
        return Object.values(categoryIdToObjMap)
        // .map(category => {
        //   return {
        //     ...category, count: category.items.length
        //   }
        // });
      });
    });
    if (category) {
      return res.send({ category });
    }
  } catch (error) {
    console.log(error)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", error: error.message });
  }
}

// Getting all items but segregated by pages
exports.getCategoriesByPage = async (req, res, next) => {
  try {
    let total, limit, page, pages;
    const options = { populate: 'parent', page: req.params.pageNumber, limit: parseInt(req.params.limit) }
    const categories = await Category.paginate({}, options)
      .then(categories => {
        const categoryIdToObjMap = {};
        total = categories.total;
        limit = categories.limit;
        page = categories.page;
        pages = categories.pages;
        categories.docs.forEach(category => {
          categoryIdToObjMap[category._id] = { ...category._doc, items: [] };
        });
        return categoryIdToObjMap;
      }).then((categoryIdToObjMap) => {
        return Item.find({}).then(items => {
          items.forEach(item => {
            if (item.category) {
              item.category.forEach(categoryId => {
                if (categoryIdToObjMap[categoryId]) {
                  categoryIdToObjMap[categoryId].items.push({ sku: item.sku, optStock: item.optStock });
                }
              });
            }
          });
          return Object.values(categoryIdToObjMap);
        });
      });

    if (categories) {
      return res.status(httpStatus.OK).json({ categories, total: total, limit: limit, page: page, pages: pages });
    }
  } catch (err) {
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}


// Enable category
exports.enableCategory = (req, res, next) => {
  try {
    Category.findOneAndUpdate({ _id: req.params.categoryId }, { status: true }, { new: true }, (err, category) => {
      if (err) {
        return resJson(res, httpStatus.NOT_MODIFIED, { message: 'Updation error', err });
      } else {
        return resJson(res, httpStatus.OK, { message: "Category enabled", category });
      }
    })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Disable category
exports.disableCategory = (req, res, next) => {
  try {
    Category.findOneAndUpdate({ _id: req.params.categoryId }, { status: false }, { new: true },
      (err, category) => {
        if (err) {
          return resJson(res, httpStatus.NOT_MODIFIED, { message: 'Updation error', err });
        } else {
          return resJson(res, httpStatus.OK, { message: "Category disabled", category });
        }
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

exports.multiEnableOrDisable = (req, res, next) => {
  try {
    const body = req.body;
    const response = [];
    if (body.status === "Enabled") {
      body.status = true;
    } else {
      body.status = false;
    }
    const promise = body.ids.map(item => {
      Category.update({ _id: item }, {
        $set: {
          status: body.status
        }
      })
        .then((err, category) => {
          if (err) {
            response.push(err);
          } else {
            response.push(category);
          }
        })
    })

    Promise.all(promise)
      .then(result => {
        if (body.status === true) {
          res.status(httpStatus.OK).json({
            message: "Categories enabled successfully"
          })
        } else {
          res.status(httpStatus.OK).json({
            message: "Categories disabled successfully"
          })
        }
      })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}


