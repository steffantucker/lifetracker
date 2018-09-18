const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  activityId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Timer", schema);
