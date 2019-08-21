const Brands = require('../models/brands');
const Item = require('../models/item');
const httpStatus = require('http-status');

const fileStore = require('../helpers/fileSave');

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
        return res.status(httpStatus.FAILED_DEPENDENCY).json(resp)
      } else {
        Brands(body).save((err, brand) => {
          if (err) {
            return res.json({ message: 'Creation error', err });
          } else {
            return res.status(httpStatus.OK).json({ message: "Successful creation", brand });
          }
        });
      }
    });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.getBrands = (req, res, next) => {
  try {
    Brands.find({})
      .then(brands => {
        return res.status(httpStatus.OK).json({ brands });
      })
      .catch(err => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
      })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.getBrand = (req, res, next) => {
  try {
    Brands.findById({ _id: req.params.id })
      .then(brand => {
        return res.status(httpStatus.OK).json({ brand });
      })
      .catch(err => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
      })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

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
          return res.status(httpStatus.FAILED_DEPENDENCY).json(resp)
        } else {
          Brands.findOneAndUpdate({_id:req.params.id}, {
            $set: body
          }, (err, brand) => {
            if (err) {
              return res.json({ message: 'Updation error', err });
            } else {
              return res.status(httpStatus.OK).send({ message: "Brand updated", brand });
            }
          });
        }
      });
    } else {
      Brands.findOneAndUpdate({_id:req.params.id}, {
        $set: body
      }, (err, brand) => {
        if (err) {
          return res.json({ message: 'Updation error', err });
        } else {
          return res.status(httpStatus.OK).send({ message: "Brand updated", brand });
        }
      })
    }
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.deleteBrand = (req, res, next) => {
  try {
    Brands.findByIdAndRemove(req.params.id)
      .then(brand => {
        return res.status(httpStatus.OK).json({ message: "Successful deletion", brand });
      })
      .catch(err => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
      })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.enableBrand = (req, res, next) => {
  try {
    Brands.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        status: true
      }
    }, (err, brand) => {
      if (err) {
        return res.json({ message: 'Updation error', err });
      } else {
        return res.status(httpStatus.OK).send({ message: "Brand enabled", brand });
      }
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.disableBrand = (req, res, next) => {
  try {
    Brands.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        status: false
      }
    }, (err, brand) => {
      if (err) {
        return res.json({ message: 'Updation error', err });
      } else {
        return res.status(httpStatus.OK).send({ message: "Brand disabled", brand });
      }
    })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

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
          res.status(httpStatus.OK).json({
            message: "Brands enabled successfully"
          })
        } else {
          res.status(httpStatus.OK).json({
            message: "Brands disabled successfully"
          })
        }
      })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}

exports.getBrandsByPage = (req, res, next) => {
  try {
    Brands.paginate({}, { page: req.params.id, limit: 10 })
      .then(brands => {
        return res.status(httpStatus.OK).json({ brands });
      })
      .catch(err => {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
      })
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "Please try again", err });
  }
}