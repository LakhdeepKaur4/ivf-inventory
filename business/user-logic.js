const User = require('../models/users');
const httpStatus = require('http-status');

exports.register = async (req, res, next) => {
    try {
      console.log('register') 
      let body = req.body;
      console.log("req body>>>", body);
      const user = await new User(body).save();
      return res.status(httpStatus.OK).json({ message: "Successful registration", user});
    } catch (error) {
      console.log(error);
      return res.send(error);
    }
};