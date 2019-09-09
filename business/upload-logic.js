const { bucketName, minioPort } = require("../config/vars");
const httpStatus = require('http-status')
const minioClient = require('../config/minio').minioClient;
const { decodeBase64Image } = require('../helpers/fileSave'); // helper function to convert base64 to buffer

exports.makeBucket = () => {
    minioClient.makeBucket('circle', function (err) {
        if (err) return console.log('Error creating bucket.', err)
        console.log('Bucket created successfully.')
    })
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
                return res.status(httpStatus.OK).json({ message: "Successful uploaded", path });
            }
        });
    } catch (err) {
        console.log(err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Please try again", err });
    }
}

