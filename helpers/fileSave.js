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

module.exports.decodeBase64Image = (dataString) => {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

