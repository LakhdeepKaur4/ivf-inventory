const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const Workflow = new Schema({
    status: {
      type: String,
      defaultValue: "new",
      index: true
    },
    workflow: {
      type: [String],
    }
  });
  

  module.exports = mongoose.model('WorkFlow', Workflow);