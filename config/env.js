// Environment variables to setup mysql/sequelize connection

module.exports = {
    database: 'tip_orders',
    username: 'rohit1',
    password: 'mysql2310',
    host: 'db4free.net',
    pool: {
        max_connections: 10,
        min_connections: 0,
        connection_acquire_time: 30000,
        connection_idle_time: 1000
    }
}