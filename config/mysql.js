const Sequelize = require('sequelize');

const env = require('./env');

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: 'mysql',
  logging: false,
  operatorAliases: false,
  pool: {
    max: env.pool.max_connections,
    min: env.pool.min_connections,
    acquire: env.pool.connection_acquire_time,
    idle: env.pool.connection_idle_time
  }
})

module.exports = sequelize;