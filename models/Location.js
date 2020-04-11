const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({

  type: {
    type: String,
    enum: ["point"],
    default: "point"
  },
  coordinates: {
    type: Array, // 
    // longitude first and then latitude:
    // Valid longitude values are between -180 and 180, both inclusive.
    // Valid latitude values are between -90 and 90, both inclusive.

  } 
  
});



module.exports = locationSchema;