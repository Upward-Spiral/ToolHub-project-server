const express           = require('express');
const router            = express.Router();
const Tool              = require ('../models/Tool');
// const multer         = require('multer');
const uploadCloudTool   = require('../config/cloudinaryTool.js');
const createTool = require('../controllers/create-tool');
// const createToolNoImg   = require('../controllers/create-tool-no-img');
const deleteTool        = require ('../controllers/delete-tool');
const getAllHerTools    = require ('../controllers/get-all-tools');

// Search all the shared tools by name
router.post('/search', (req, res, next) => {
  debugger
  let searchPhrase = req.body.word
  let searchCo = [Number(req.body.lng),Number(req.body.lat) ]  // e.g. [4.8670948,52.3756701]
  console.log (searchCo)
  Tool.aggregate([
    {

      '$geoNear': {
        'near': {
          'type': 'Point', 
          'coordinates': searchCo
        }, 
        'distanceField': 'distanceFrom', 
        'maxDistance': 200000, 
        'query': {
          'name': new RegExp(searchPhrase)
        }
      }
    },
    {
      '$lookup': {
        'from': 'users', 
        'localField': 'owner', 
        'foreignField': '_id', 
        'as': 'owner'
      }
    }
  ]) 
    .then((toolData)=>{
          console.log(toolData)
          res.status(200).json(toolData)   
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        messageBody: `Error, could not fetch because: ${err}`
      })
    });
});

// Get list of all her tools
router.get('/toolshed', (req,res)=> {
  debugger
  let userId = req.session.currentUser._id;
  getAllHerTools(userId)
    .then ((toolsList)=>{
      res.status(200).json({
        messageBody: "Fetch successful.",
        data: toolsList
      })
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch tool list because: ${err}`
      })
    });
})

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
router.post("/create", (req,res)=>{
  debugger
  let userId = req.session.currentUser._id;
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
})

// Share a tool
router.get('/share/:id', (req,res) => {
  debugger
  let toolId = req.params.id;
  Tool.findByIdAndUpdate(toolId, {
    shared:true
  },{new:true})
    .then((toolData) => {
      console.log(toolData)
      res.status(200).json(toolData)
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch tool detail because: ${err}`
      })
    });

})

// Unshare a tool
router.get('/unshare/:id', (req,res) => {
  debugger
  let toolId = req.params.id;
  Tool.findByIdAndUpdate(toolId, {
    shared:false
  },{new:true})
    .then((toolData) => {
      console.log(toolData)
      res.status(200).json(toolData)
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch tool detail because: ${err}`
      })
    });

})

// Borrow a tool
router.get('/borrow/:id', (req,res) => { // not finished
  debugger
  let userId = req.session.currentUser._id;
  let toolId = req.params.id;
  Tool.findByIdAndUpdate(toolId, {
    $push:{
      requested_by: userId
    }
  },{new:true})
    .then((toolData) => {
      console.log(toolData)
      res.status(200).json(toolData)
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch tool detail because: ${err}`
      })
    });

})

// Reserve a tool
router.get('/reserve/:id', (req,res) => {   // not finished!
  debugger
  let toolId = req.params.id;
  Tool.findByIdAndUpdate(toolId, {
    $push:{
      reserved_by: userId
    }
  },{new:true})
    .then((toolData) => {
      console.log(toolData)
      res.status(200).json(toolData)
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, could not fetch tool detail because: ${err}`
      })
    });

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