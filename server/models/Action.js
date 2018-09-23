const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false,
    default: ""
  },
  activityId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Activity",
    required: true
  }
});

module.exports = mongoose.model("Action", schema);
