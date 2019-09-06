const fs = require('fs');
const path = require('path');

module.exports.fileStore = (filename, fileext, content, pathreq, cb) => {
    let pathmod = path.join(__dirname, pathreq);
    fs.writeFile(`${pathmod}${filename}.${fileext}`, content, 'base64', (err, res) => {
        if (err) {
            cb(true, err);
        } else {
            cb(false, res);
        }
    });
}

