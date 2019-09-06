// Environment variables to setup connection
require('dotenv-safe').config({
    example: './.env'
});

module.exports = {
    env: {
        NODE_ENV: 'development',
        PORT: 3000
    },
    mysql: {
        database: 'sql7303918',
        username: 'sql7303918',
        password: 'QZQyrDHdyB',
        host: 'sql7.freemysqlhosting.net',
        pool: {
            max_connections: 10,
            min_connections: 0,
            connection_acquire_time: 30000,
            connection_idle_time: 1000
        }
    },
    mongo: {
        MONGO_URI: 'mongodb://rohit1:mongo2310@tip-inv-shard-00-00-t6mm4.mongodb.net:27017,tip-inv-shard-00-01-t6mm4.mongodb.net:27017,tip-inv-shard-00-02-t6mm4.mongodb.net:27017/inventory?ssl=true&replicaSet=TIP-INV-shard-0&authSource=admin&retryWrites=true&w=majority'
    },
    rabbitmq: {
        url: 'rabbitmq.ivfuture.internal',
        port: 15672,
        username: 'admin',
        password: 'AYa0dkyR9fEZBiGX2zZq'
    },
    minio: {
        BUCKET_NAME: 'circle',
        MINIO_URL: 'minio.ivfuture.internal',
        MINIO_PORT: 9000,
        MINIO_USE_SSL: false,
        MINIO_ACCESSKEY: '74RGVAAV0MPTM2YAU72Q',
        MINIO_SECRETKEY: '6HJKLQdmlRjqnLr+984R5JEmT1VTf07GgKoZ4xet'
    }
}
