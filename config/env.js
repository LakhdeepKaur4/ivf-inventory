// Environment variables to setup mysql/sequelize connection

module.exports = {
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
}