
const Tool    = require ('../models/Tool');

function deleteTool (toolId) {
  return Tool.findByIdAndDelete(toolId)
    .then((response)=>{
       return ({
         status:200,
         messageBody: "Tool deleted successfully."
       }) 
    })
    .catch((err)=>{
      return ({
        status: 500,
        messageBody: `Error, user not logged in because: ${err}`
      })
    })
}

module.exports = deleteTool;
