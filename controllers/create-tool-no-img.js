const Tool          = require ('../models/Tool');
const uploadCloud = require('../config/cloudinary.js');

function createToolNoImg (userId,body) {
  var result="";
  Tool.create({
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
      result= JSON.stringify({
        code: "200",
        messageBody: "Tool created successfully.",
        data: toolData
      })
      console.log(`the result: ${result}`)
      return result;
      
  })
  .catch((err)=> {
      result= JSON.stringify({
        code: "500",
        messageBody: `Error, user not created ${err}`
      })
      console.log(`the error result: ${result}`)
      return result;
  })
  
}

module.exports = createToolNoImg;