var bcrypt = require("bcryptjs");
const shortId = require('short-id');
const path = require('path');
const fs = require('fs');

exports.comparePassword = (passw, dbPassword, cb) => {
    bcrypt.compare(passw, dbPassword, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

exports.saveToDisc = (_id, name, fileExt, base64String, callback) => {
    console.log("HERE ", name, fileExt);
    let pathFile = "../public/thumbnails/" + _id + '_' + new Date() + '_' + name + "." + fileExt;
    let fileName = path.join(__dirname, pathFile);
    let dataBytes = Buffer.from(base64String, 'base64');
    // console.log(base64String);
    fs.writeFile(fileName, dataBytes, function (err) {
        if (err) {
            console.log("eroor", err)
            callback(err);
        } else {
            console.log(pathFile)
            callback(null, pathFile);
        }
    });
}