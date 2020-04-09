const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const LocationSchema = require('../models/Location')

const userSchema = new Schema({
    firstname: {
      type: String,
      // required:true
    },
    lastname: {
      type: String,
      // required:true
    },
    displayname: {
      type: String,
      required:true
    },
    username: {
      type: String,
      required:true,
      unique: true
    },
    password: {
      type: String,
      required:true,
      unique: true
    },
    image:{
        type: String,
        default: ""
    },
    email: {
      type: String,
      required:true,
      unique: true
    },
    phone: {
      type: String,
    },
    address: [LocationSchema],
    tools: [{
      type: mongoose.Types.ObjectId, 
      ref: "tools"
    }],
    transactions: [{
      type: mongoose.Types.ObjectId, 
      ref: "transactions"
    }],
    buddies: [{
      type: mongoose.Types.ObjectId, 
      ref: "users"
    }],
    new_reqs: { 
      type: Boolean,
      default: false
    },
    buddy_request: [{
      type: mongoose.Types.ObjectId, 
      ref: "users"
    }]
  
  });

const User = mongoose.model("users",userSchema)

module.exports = User;