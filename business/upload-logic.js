const { bucketName, minioPort } = require("../config/vars");
const httpStatus = require('http-status')
const minioClient = require('../config/minio').minioClient;

exports.makeBucket = () => {
    minioClient.makeBucket('circle', function (err) {
        if (err) return console.log('Error creating bucket.', err)
        console.log('Bucket created successfully.')
    })
}

function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}


exports.uploadFiles = async (req, res, next) => {
    try {
        const body = req.body;
        let imageBuffer = decodeBase64Image(body.picture);
        const foldername = `${body.foldername}/${body.filename}`
        const path = `${bucketName}/${body.foldername}/${body.filename}`;
        minioClient.putObject(bucketName, foldername, imageBuffer.data, (error, resp) => {
            if (error) {
                return res.status(httpStatus.NOT_IMPLEMENTED).json({ message: 'Upload error', error });
            } else {
                console.log(resp)
                return res.status(httpStatus.OK).json({ message: "Successful uploaded", path });
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Please try again", err });
    }
}

