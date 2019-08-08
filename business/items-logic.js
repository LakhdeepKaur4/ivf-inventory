const Item = require('../models/item')
const httpStatus = require('http-status');

exports.createItems = async (req, res, next) => {
  try {
    let body = req.body;
    const user = await new Item(body).save();
    return res.status(httpStatus.OK).json({ message: "Successful registration", user });
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
    let item = await Item.findByIdAndRemove({ _id: req.params.id });
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
