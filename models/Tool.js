const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ImageSchema = require('./Image');

const toolSchema = new Schema({
      name:{
        type: String,
        required:true,
        lowercase: true
      },
      brand: {
        type: String,
        required:true
      },
      modelNo: {
        type: String,
        default: null
      },
      category: {
        type: String,
        required:true,
        lowercase: true
      },
      subCategory1: {
        type: String,
        required:true,
        lowercase: true
      },
      subCategory2: {
        type: String,
        default: null,
        lowercase: true
      },
      images: [ImageSchema],
      owner: { 
        type: mongoose.Types.ObjectId, 
        ref: "users" 
      },
      shared: {
        type: Boolean,
        default:false
      },
      description: {
        type: String,
        default: ""
      },
      available: {
        type: Boolean,
        default: true
      }
  
  });

const Tool = mongoose.model("tools",toolSchema)

module.exports = Tool;