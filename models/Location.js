const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
      city:{
        type: String,
        required:true
      },
      Street1: {
        type: String,
        required:true
      },
      Street2: {
        type: String
      },
      lotNo: {
        type: String,
        required:true
      },
      unitNo: {
        type: String
      },
      pcode: {
        type: String,
        required:true
      }
  
  });

// const Location = mongoose.model("locations",locationSchema)

module.exports = locationSchema;