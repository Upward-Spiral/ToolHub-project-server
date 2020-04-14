const Tool          = require ('../models/Tool');
var qs = require('qs');


function createTool (userId,body) {
  debugger
    var tempTool = qs.parse(body);
    if (tempTool.images) var newImage = tempTool.images[0];   
    let type = body.locationType
    debugger
    let locationLatt = Number(body.locationLatt);
    let locationLong = Number(body.locationLong);
    let coordinates= [locationLong,locationLatt]
    const tempCategory= tempTool.category;
    return Tool
        .create ({
          name: body.name,
          brand: body.brand,
          modelNo: body.modelNo,
          category: tempCategory,
          description: body.description,
          owner: userId,
          location: {type,coordinates}
        })
        .then((toolData) => {
          if(toolData.images) toolData.images.push(newImage);
          toolData.save()
            .then((toolData)=>{
              console.log(toolData)

            })
            .catch(err => {
              console.log(err)
            }); 
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

module.exports = createTool;