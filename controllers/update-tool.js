const Tool          = require ('../models/Tool');
var qs = require('qs');


function updateTool (toolId,body) {
  debugger
    var tempTool = qs.parse(body);
    const tempCategory= tempTool.category;
    return Tool
        .findByIdAndUpdate(toolId,{
          name: body.name,
          brand: body.brand,
          modelNo: body.modelNo,
          category: tempCategory,
          description: body.description
        },{new:true})
        .populate('owner')
        .then((toolData) => {
          
          return ({
            status: 200,
            messageBody: "created successfully.",
            data: toolData
          })
        })
        .catch(err => {
          return ({
            status: 500,
            messageBody: `Error, from outer catch in controller because: ${err}`,
            data: null
          })
        }); 

}

module.exports = updateTool;