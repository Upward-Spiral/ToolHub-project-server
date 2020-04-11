const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
      type:{
        type: String,
        enum: [
          "brw-req", // borrow-request 
          "rsv-req", // reserve-request
          "rtn-req"  // return-request
        ], 
        required:true
      },
      startDate: {
        type: String,
        required:true
      },
      endDate: {
        type: String,
        required:true
      },
      maker: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required:true
      },
      target: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required:true
      },
      tool: {
        type: mongoose.Types.ObjectId,
        ref: "tools",
        required:true
      }
  
  });

const Transaction = mongoose.model("locations",transactionSchema)

module.exports = Transaction;