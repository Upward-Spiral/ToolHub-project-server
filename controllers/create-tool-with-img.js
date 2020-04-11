const Tool          = require ('../models/Tool');
const uploadCloud   = require('../config/cloudinary.js');

function createToolWithImg (userId,body,file) {
    const imgPath= file.url;
    const imgName= file.originalname;
    var newImage = {"imgName":imgName, "imgPath":imgPath};
    return Tool
        .create ({
          name: body.name,
          brand: body.brand,
          modelNo: body.modelNo,
          category: body.category,
          subCategory1: body.subCategory1,
          subCategory2: body.subCategory2,
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
            messageBody: "Update successfull.",
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

module.exports = createToolWithImg;