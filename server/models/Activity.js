const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
		type: String,
		required: true
	},
  description: {
    type: String,
    required: false
	},
	color: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model("Activity", schema);
