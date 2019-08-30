const Brands = require('../models/brands'); // Brands model imported
const Item = require('../models/item'); // Items/Products model imported
const httpStatus = require('http-status'); // Module to provide HTTP response codes

const fileStore = require('../helpers/fileSave'); // helper function to save image file
const resJson = require('../helpers/response').resJson; //helper function to send response in JSON format

// Create/Add a brand
exports.createBrand = (req, res, next) => {
  try {
    const body = req.body;
    let file = body.logo;
    let fileExt = file.slice(file.indexOf('/') + 1, file.indexOf(';'));
    file = file.slice(file.indexOf(',') + 1);

    body.logo_url = `public/images/brandLogos/${body.name}.${fileExt}`;
    if (body.status === 'Enabled') {
      body.status = true;
    } else {
      body.status = false;
    }

    fileStore(body.name, fileExt, file, '../public/images/brandLogos/', (err, resp) => {
      if (err) {
        return resJson(res, httpStatus.FAILED_DEPENDENCY, resp);
      } else {
        Brands(body).save((err, brand) => {
          if (err) {
            return resJson(res, httpStatus.NOT_IMPLEMENTED, { message: 'Creation error', err });
          } else {
            return resJson(res, httpStatus.CREATED, { message: "Successful creation", brand });
          }
        });
      }
    });
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Getting all brands
exports.getBrands = (req, res, next) => {
  try {
    Brands.find({})
      .then(brands => {
        return resJson(res, httpStatus.OK, { brands });
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_FOUND, { message: "Please try again", err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Getting a brand using the brandId
exports.getBrand = (req, res, next) => {
  try {
    Brands.findById({ _id: req.params.id })
      .then(brand => {
        return resJson(res, httpStatus.OK, { brand });
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_FOUND, { message: "Please try again", err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Update/Edit a brand details using brandId
exports.updateBrand = (req, res, next) => {
  try {
    const body = req.body;
    if (body.status === 'Enabled') {
      body.status = true;
    } else {
      body.status = false;
    }
    if (body.hasOwnProperty('logo')) {
      let file = body.logo;
      let fileExt = file.slice(file.indexOf('/') + 1, file.indexOf(';'));
      file = file.slice(file.indexOf(',') + 1);

      body.logo_url = `public/images/brandLogos/${body.name}.${fileExt}`;
      fileStore(body.name, fileExt, file, '../public/images/brandLogos/', (err, resp) => {
        if (err) {
          return resJson(res, httpStatus.FAILED_DEPENDENCY, resp);
        } else {
          Brands.findOneAndUpdate({ _id: req.params.id }, {
            $set: body
          }, (err, brand) => {
            if (err) {
              return resJson(res, httpStatus.NOT_MODIFIED, { message: 'Updation error', err });
            } else {
              return resJson(res, httpStatus.CREATED, { message: "Brand updated", brand });
            }
          });
        }
      });
    } else {
      Brands.findOneAndUpdate({ _id: req.params.id }, {
        $set: body
      }, (err, brand) => {
        if (err) {
          return resJson(res, httpStatus.NOT_MODIFIED, { message: 'Updation error', err });
        } else {
          return resJson(res, httpStatus.CREATED, { message: "Brand updated", brand });
        }
      })
    }
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Hard delete a brand from database
exports.deleteBrand = (req, res, next) => {
  try {
    Brands.findByIdAndRemove(req.params.id)
      .then(brand => {
        return resJson(res, httpStatus.CREATED, { message: "Successful deletion", brand });
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_IMPLEMENTED, { message: "Please try again", err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Change the status of a brand - enabled
exports.enableBrand = (req, res, next) => {
  try {
    Brands.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        status: true
      }
    }, (err, brand) => {
      if (err) {
        return resJson(res, httpStatus.NOT_MODIFIED, { message: 'Updation error', err });
      } else {
        return resJson(res, httpStatus.CREATED, { message: "Brand enabled", brand });
      }
    })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Change the status of a brand - disabled
exports.disableBrand = (req, res, next) => {
  try {
    Brands.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        status: false
      }
    }, (err, brand) => {
      if (err) {
        return resJson(res, httpStatus.NOT_MODIFIED, { message: 'Updation error', err });
      } else {
        return resJson(res, httpStatus.CREATED, { message: "Brand disabled", brand });
      }
    })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Change the status of multiple brands - Enabled/Disabled
exports.multiEnableOrDisable = (req, res, next) => {
  try {
    const body = req.body;
    const response = [];

    if (body.status === "enabled") {
      body.status = true;
    } else {
      body.status = false;
    }
    const promise = body.ids.map(item => {
      Brands.findOneAndUpdate({ _id: item }, {
        $set: {
          status: body.status
        }
      })
        .then((err, brand) => {
          if (err) {
            response.push(err);
          } else {
            response.push(brand);
          }
        })
    })

    Promise.all(promise)
      .then(result => {
        if (body.status === true) {
          return resJson(res, httpStatus.CREATED, { message: "Brands enabled successfully" });
        } else {
          return resJson(res, httpStatus.CREATED, { message: "Brands disabled successfully" });
        }
      })
  } catch (error) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}

// Getting all brands but segregated by pages
exports.getBrandsByPage = (req, res, next) => {
  try {
    Brands.paginate({}, { page: req.params.id, limit: 10 })
      .then(brands => {
        let brandsSend = [];
        const promise = brands.docs.map(async item => {
          let products_quantity = await Item.where({ brandId: item._id }).count();
          Brands.findOneAndUpdate({ _id: item._id }, {
            $set: {
              products_quantity: products_quantity
            }
          }, (err, brand) => { });
          item.products_quantity = products_quantity;
          brandsSend.push(item);
        })

        Promise.all(promise).then(result => {
          return resJson(res, httpStatus.OK, { brands: { docs: brandsSend, total: brands.total, limit: brands.limit, page: brands.page, pages: brands.pages } });
        })
      })
      .catch(err => {
        return resJson(res, httpStatus.NOT_FOUND, { message: "Please try again", err });
      })
  } catch (err) {
    return resJson(res, httpStatus.INTERNAL_SERVER_ERROR, { message: "Please try again", err });
  }
}