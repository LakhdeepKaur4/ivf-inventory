var Minio = require("minio");

exports.minioClient = new Minio.Client({
    endPoint: "minio.ivfuture.internal",
    port: 9000,
    useSSL: false,
    accessKey: "74RGVAAV0MPTM2YAU72Q",
    secretKey: "6HJKLQdmlRjqnLr+984R5JEmT1VTf07GgKoZ4xet"
});

