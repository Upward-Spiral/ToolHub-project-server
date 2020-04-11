const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema ({
  imgName: {
    type: String,
    required: true
  },
  imgPath: {
    type: String,
    required: true
  }
});

module.exports = imageSchema;