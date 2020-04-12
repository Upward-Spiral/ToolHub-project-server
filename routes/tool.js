const express           = require('express');
const router            = express.Router();
const Tool              = require ('../models/Tool');
// const multer         = require('multer');
const uploadCloudTool   = require('../config/cloudinaryTool.js');
const createTool = require('../controllers/create-tool');
const createToolNoImg   = require('../controllers/create-tool-no-img');
const deleteTool        = require ('../controllers/delete-tool');

// Search all the shared tools by name
router.get('/search', (req, res, next) => {
  let thePhrase = req.query.name
  // thePhrase = thePhrase.toLowercase()

  // Tool.find(
  //   {
  //     $and: [
  //     { name: { $regex: thePhrase, $options: 'ix'  }},
  //     { shared: true}
  //   ]
  // }
  // )
  Tool.aggregate([
    {
      $geoNear
    }
  ])
    .populate('owner','displayname')
    // .where('shared')
    // .equals(true)
    .select({ 
      "name": 1, 
      "owner.displayname":1, 
      "available":1,
      "image": 1
    })
    .then((toolData)=>{
      res.status(200).json({
        messageBody: "Fetch successful.",
        data:toolData
      })
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch because: ${err}`
      })
    });
});

// Get all info on one tool
router.get('/detail/:id', (req,res) => {
  let toolId = req.params.id;
  Tool.findById(toolId)
    .populate('owner')
    .then((toolData) => {
      res.status(200).json({
        messageBody: "Fetch successful.",
        data:toolData
      })
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch tool detail because: ${err}`
      })
    });

})

// Create a new tool
router.post("/create", /* uploadCloudTool.single('tool-img'), */(req,res)=>{
  debugger
  let userId = req.session.currentUser._id;
    // let temp_re_body = {...req.body}

    createTool(userId,req.body)
    .then ((response) => {
      let {status,messageBody,data}= response;
      if (status===200) {
        res.status(200).json(data)
      } else {
        res.status(500).json({
            messageBody: messageBody
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, tool not created because: ${err}`
      })
    });
  // }
  
})

// Update a tool (not image)
router.post ('/update', (req,res) => {
  let toolId = req.body.id
  Tool.findByIdAndUpdate(toolId, {
    name: req.body.name,
    brand: req.body.brand,
    modelNo: req.body.modelNo,
    category: req.body.category,
    subCategory1: req.body.subCategory1,
    subCategory2: req.body.subCategory2,
    description: req.body.description
  }, {new:true})
  .then((toolData) => {
    res.status(200).json({
      messageBody: "Tool updated successfully!",
      data: toolData
    })
  })
  .catch(err => {
    res.status(500).json({
      messageBody: `Error, tool not updated because: ${err}`
    })
  });
})

// Upload images for a tool
router.post('/upload-image', uploadCloudTool.single('tool-img'), (req,res)=>{
  debugger
  const imgPath= req.file.url;
  const imgName= req.file.originalname;
  var newImage = {imgName:imgName, imgPath:imgPath};
  console.log(newImage);
  res.status(200).json(newImage);
  
  // Tool.findById(toolId)
  //   .then((tool)=>{
  //     picFiles.forEach((pic)=>{
  //       let imgPath = pic.url;
  //       let imgName = pic.originalname;
  //       let newImage = {"imgName":imgName, "imgPath":imgPath}; 
  //       tool.images.push(newImage);
  //     })
  //     tool.save().then((response)=>{
  //       console.log(response.images)
  //     }).catch((err)=>{console.log(err)})
  //     res.status(200).json({
  //       messageBody: "I hope this went ok!",
  //       date: tool
  //     })
  //   })
  //   .catch(err => {
  //     res.status(500).json({
  //       messageBody: `Error, images not updated because: ${err}`
  //     })
  //   }); 
})


// Delete a tool
router.get('/delete/:id', (req,res)=> {
  let toolId = req.params.id;
  deleteTool(toolId)
  .then((response)=>{
    res.status(response.status).json({
      messageBody : response.messageBody
    })
    console.log(response)
  })
  .catch(err => {
    console.log( `Error, user deleted because: ${err}`)
  })

  // Tool.findByIdAndDelete(userId)
  //   .then((response)=> {
  //     res.status(200).json({
  //       messageBody: "Tool deleted successfully.",
  //       data:response
  //     })
  //   })
  //   .catch(err => {
  //     return ({
  //       status: 500,
  //       messageBody: `Error, tool deleted because: ${err}`,
  //       data: null
  //     })
  //   });
})



module.exports = router;