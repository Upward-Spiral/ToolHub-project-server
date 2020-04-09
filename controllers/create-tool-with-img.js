const Tool          = require ('../models/Tool');
const uploadCloud = require('../config/cloudinary.js');

function createToolWithImg (userId,body,file) {
    const imgPath= file.url;
    const imgName= file.originalname;
    var result="";
    var aTool = new Tool({
      name: body.name,
      brand: body.brand,
      modelNo: body.modelNo,
      category: body.category,
      subCategory1: body.subCategory1,
      subCategory2: body.subCategory2,
      description: body.description,
      owner: userId,
      shared: false
    });
    aTool.images.push({imgName:imgName,imgPath:imgPath});
    var tempImg= aTool.images[0];
    console.log(tempImg);
    console.log(aTool)

    aTool.save((err)=>{
      if (err) {result= {
        code: 500,
        messageBody: `Error, tool not created because:  ${err}`
      }
      return 1;
    }
      else {result= {
        code: 200,
        messageBody: 'tool created successfully!',
        data: aTool
      }
       return -1;
    }
    })

   

}

module.exports = createToolWithImg;