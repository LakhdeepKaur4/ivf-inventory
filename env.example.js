// Environment variables to setup connection

module.exports = {
    mysql: {
        database: 'db_name',
        username: 'db_user',
        password: 'db_pass',
        host: 'db_host',
        pool: {
            max_connections: 'maximum no. of connections in number and not string',
            min_connections: 'minimum no. of connections in number and not string',
            connection_acquire_time: 'limit of connection acquire time in number and not string',
            connection_idle_time: 'limit of connection remains idle time in number and not string'
        }
    },
    mongo: {
        MONGO_URI: 'Mongo Connection URI'
    },
    env: {
        NODE_ENV: 'Node environment for example production/development',
        PORT: 'Port to run node app/server'
    }
}