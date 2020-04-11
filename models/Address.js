const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocationSchema = require('./Location')

const addressSchema = new Schema({
      city:{
        type: String,
        required:true
      },
      street1: {
        type: String,
        required:true
      },
      street2: {
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
      },
      loc: {
        type: LocationSchema
      }
  
  });



module.exports = addressSchema;