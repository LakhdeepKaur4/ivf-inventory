const path = require("path");

// import .env variables
require("dotenv-safe").load({
  path: path.join(__dirname, "../.env"),
  sample: path.join(__dirname, "../.env.example")
});
module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    uri:
      process.env.NODE_ENV === "test"
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI
  },
};