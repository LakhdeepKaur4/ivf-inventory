const Test = require('../models/test');
const Test1 = require('../models/test1')
const httpStatus = require('http-status');

exports.register = async (req, res, next) => {
    try {
        let body = req.body;
        let _startTime = Date.now();
        const test = await new Test(body).save();
        if (_startTime != null) {
            console.log('Runtime in MS: ', Date.now() - _startTime);
        }
        return res.status(httpStatus.OK).json({ message: "Successful Test", test });
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

exports.registerTest = async (req, res, next) => {
    try {
        let body = req.body;
        let _startTime = Date.now();
        const test = await new Test(body).save();
        if (_startTime != null) {
            console.log('Runtime in MS: ', Date.now() - _startTime);
        }
        return res.status(httpStatus.OK).json({ message: "Successful Test", test });
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

