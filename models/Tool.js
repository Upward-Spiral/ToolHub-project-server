const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ToolImageSchema = require('../models/ToolImage');

const toolSchema = new Schema({
      name:{
        type: String,
        required:true
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
        required:true
      },
      subCategory1: {
        type: String,
        required:true
      },
      subCategory2: {
        type: String,
        default: null
      },
      images: [ToolImageSchema],
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