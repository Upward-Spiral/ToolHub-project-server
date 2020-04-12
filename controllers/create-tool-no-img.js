const Tool          = require ('../models/Tool');
const uploadCloud = require('../config/cloudinaryUsers.js');

function createToolNoImg (userId,body) {
  var result="";
  return Tool.create({
        name: body.name,
        brand: body.brand,
        modelNo: body.modelNo,
        category: body.category,
        subCategory1: body.subCategory1,
        subCategory2: body.subCategory2,
        description: body.description,
        owner: userId,
        shared: false
      })
      .then((toolData)=>{
          console.log("created: ", toolData)
          return ({
            status: 200,
            messageBody: "Tool created successfully.",
            data: toolData
          })          
      })
      .catch((err)=> {
          return ({
            status: 500,
            messageBody: `Error, tool not created ${err}`
          })
      })
      
}

module.exports = createToolNoImg;