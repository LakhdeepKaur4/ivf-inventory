const Category = require('../models/category')
const httpStatus = require('http-status');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const helper = require('../helpers/user');

exports.createCategory = async (req, res, next) => {
  try {
    let body = req.body;
    const category = await new Category(body).save();
    const categoryId = category._id;
    console.log(categoryId);
    // if (body.categoryThumbnail) {
    let index = body.fileName.lastIndexOf('.');
    body.fileExt = body.fileName.slice(index + 1);
    body.fileName = body.fileName.slice(0, index);
    body.picture = body.picture.split(',')[1];
    await helper.saveToDisc(categoryId, body.fileName, body.fileExt, body.picture, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        let index = res.indexOf('../');
        let newPath = res.slice(index + 2, res.length);
        Category.update({ _id: categoryId }, { $set: { categoryThumbnail: newPath } }, function (err, updated) {
          if (err) {
            console.log(err)
          } else {
            console.log(updated)
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
    const category = await Category.find({});
    console.log(category)
    if (category) {
      return res.send({ category });
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
        }
      })
    if (category) {
      return res.status(httpStatus.OK).json({ category });
    }
  } catch (error) {
    console.log(error);
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
    if (req.body.picture !== undefined && req.body.picture !== null && req.body.fileName !== undefined && req.body.fileName !== null) {
      let index = body.fileName.lastIndexOf('.');
      body.fileExt = body.fileName.slice(index + 1);
      body.fileName = body.fileName.slice(0, index);
      body.picture = body.picture.split(',')[1];
      await helper.saveToDisc(categoryId, body.fileName, body.fileExt, body.picture, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          let index = res.indexOf('../');
          let newPath = res.slice(index + 2, res.length);
          Category.update({ _id: categoryId }, { $set: { categoryThumbnail: newPath } }, function (err, updated) {
            if (err) {
              console.log(err)
            } else {
              console.log(updated)
            }
          })
        }
      })
      let category = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      if (category) {
        return res.status(httpStatus.OK).send({ message: "Category updated" });
      }
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


