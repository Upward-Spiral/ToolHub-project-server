const Tool          = require ('../models/Tool');
var qs = require('qs');
// const uploadCloud   = require('../config/cloudinaryTool.js');

function createTool (userId,body) {
  debugger
    var tempTool = qs.parse(body);
    
    // const imgPath= body["images[0][imgPath]"];
    // const imgName= body["images[0][imgName]"];
    // var newImage = {"imgName":imgName, "imgPath":imgPath};
    var newImage = tempTool.images[0];
    const tempCategory= tempTool.category;
    // const subCategory1= body[category[1]];
    // let tempCat = [category,subCategory1]
    // var category = [body.category, body.subCategory1, body.subCategory2]
    return Tool
        .create ({
          name: body.name,
          brand: body.brand,
          modelNo: body.modelNo,
          category: tempCategory,
          description: body.description,
          owner: userId
          // $push: {
          //   images : newImage
          // }
        })
        .then((toolData) => {
          toolData.images.push(newImage);
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
    // var aTool = new Tool({
      // name: body.name,
      // brand: body.brand,
      // modelNo: body.modelNo,
      // category: body.category,
      // subCategory1: body.subCategory1,
      // subCategory2: body.subCategory2,
      // description: body.description,
      // owner: userId,
      // shared: false
    // });
    // aTool.images.push({imgName:imgName,imgPath:imgPath});
    // var tempImg= aTool.images[0];
    // console.log(tempImg);
    // console.log(aTool)

    // return aTool.save((err)=>{
    //           if (err) {return ({
    //             code: 500,
    //             messageBody: `Error, tool not created because:  ${err}`,
    //             data: aTool
    //           })
    //           }
    //           else {return ({
    //             code: 200,
    //             messageBody: 'tool created successfully!',
    //             data: aTool
    //           })
    //         }
    //       })

   

}

module.exports = createTool;