const {env,mongo} = require('../env'); // Environment variables imported

module.exports = {
  env: env.NODE_ENV || 'development',
  port: env.PORT,
  mongo: {
    uri:
      env.NODE_ENV === "test"
        ? mongo.MONGO_URI_TESTS
        : mongo.MONGO_URI
  }
};