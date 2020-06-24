const Tool          = require ('../models/Tool');
var qs = require('qs');


function createTool (userId,body) {
  debugger
    var tempTool = qs.parse(body);   
    let type = body.locationType
    let locationLatt = Number(body.locationLatt);
    let locationLong = Number(body.locationLong);
    let coordinates= [locationLong,locationLatt]
    const tempCategory= tempTool.category;
    const tempImages = tempTool.images
    return Tool
        .create ({
          name: body.name,
          brand: body.brand,
          modelNo: body.modelNo,
          category: tempCategory,
          description: body.description,
          owner: userId,
          location: {type,coordinates},
          images: tempImages
        })
        .then((toolData) => {
              console.log(toolData)
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