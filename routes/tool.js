const express       = require('express');
const router        = express.Router();
const Tool          = require ('../models/Tool');
const multer        = require('multer');
var upload          = multer({ dest: 'public/images/' });
const uploadCloud   = require('../config/cloudinary.js');
const createToolWithImg = require('../controllers/create-tool-with-img')
const createToolNoImg = require('../controllers/create-tool-no-img')

// Search all the shared tools by name
router.get('/search', (req, res, next) => {
  let thePhrase = req.query.name

  Tool.find(
    {
      $and: [
      { name: { $regex: thePhrase }},
      { shared: true}
    ]
  }
  )
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
        messageBody: `Error, could not fetch because: ${err}`
      })
    });

})

router.post("/create", uploadCloud.single('tool-img'),(req,res)=>{
  let userId = req.session.currentUser._id;
  var response = "";
  if (!req.file){
    response=createToolNoImg(userId,req.body)
    setTimeout((response)=>{
      console.log(response)
      res.status(200).json({message:"Tool created with no image"})
    },1000)
    
  } else {
    response=createToolWithImg(userId,req.body,req.file)
    setTimeout((response)=>{
      console.log(response)
      res.status(600).json({message:"Tool created with image"})
    },1000)
  }
  
  // let endRes = JSON.parse(response)
  // if (endRes.code === 200) {
  //   let message = endRes.messageBody;
  //   let toolData = endRes.data;
  //   res.status(200).json({
  //     messageBody:message,
  //     data: toolData
  //   })
  // }
  
})

module.exports = router;