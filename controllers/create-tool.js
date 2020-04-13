const Tool          = require ('../models/Tool');
var qs = require('qs');


function createTool (userId,body) {
  debugger
    var tempTool = qs.parse(body);
    var newImage = tempTool.images[0];
    let type = body.locationType
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
          // "$set": {
          //   location: {type,coordinates}
          // }
          // $push: {
          //   images : newImage
          // }
        })
        .then((toolData) => {
          toolData.images.push(newImage);
          toolData.location.type = type;
          toolData.location.coordinates[0] = locationLong;
          toolData.location.coordinates[1] = locationLatt;
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