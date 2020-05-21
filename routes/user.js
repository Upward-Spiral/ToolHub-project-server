const express           = require('express');
const router            = express.Router();
// const bcrypt = require('bcrypt');
const User              = require ('../models/User')
const updateInfo        = require ("../controllers/update-info");
const updateProfileImg  = require ('../controllers/update-profile-img');
const deleteTool        = require ('../controllers/delete-tool');
const uploadCloudUser       = require ('../config/cloudinaryUser.js');
// const getGeoJsonLocation = require ('../controllers/get-location')

// Update user info - no image
router.post('/update', (req,res)=>{
  debugger
  let userId = req.session.currentUser._id; 
    updateInfo(req.body,userId)
      .then((response) => {
        let {status,messageBody,data}= response;
        if (status === 200) {  
          res.status(200).json(data)
        } else {
          res.status(500).json({
              messageBody: messageBody
            });
        }
      })

})

// Upload images for a user
router.post('/upload-image', uploadCloudUser.single('user-img'), (req,res)=>{
  debugger
  const imgPath= req.file.url;
  const imgName= req.file.originalname;
  var newImage = {imgName:imgName, imgPath:imgPath};
  console.log(newImage);
  res.status(200).json(newImage);
})

// Update a user's image
router.post('/update-img', (req,res) => {
  let userId = req.session.currentUser._id;
  let newImage = qs.parse(req.body); 
  updateProfileImg(userId,newImage)
    .then((response) => {
      let {status,messageBody,data}= response;
      if (status === 200) {
        res.status(200).json(data)
      } else {
        res.status(500).json({
            messageBody: messageBody
          });
      }
    })

})

// Get list of her friends
router.get('/buddies', (req,res)=>{
  debugger
  let userId = req.session.currentUser._id;
  User.findById(userId)
  .populate('buddies')
  .then ((userData)=>{
    let buddiesData = userData.buddies
    res.status(200).json({
      messageBody: "Fetch successful.",
      data: buddiesData
    })
  })
  .catch(err => {
    res.status(500).json({
      messageBody: `Error, could not fetch user data because: ${err}`
    })
  });
} )

// Get profile
router.get('/profile/:id', (req,res)=>{
  // let loggedUserId = req.session.currentUser._id;
  let userId = req.params.id;
  User.findById(userId)
  .then ((userData)=>{
    res.status(200).json({
      messageBody: "Fetch successful.",
      data: userData
    })
  })
  .catch(err => {
    res.status(500).json({
      messageBody: `Error, could not fetch user data because: ${err}`
    })
  });
})

// Logout
router.get('/logout', (req, res) => {
  if (req.session.currentUser) {
    req.session.destroy();
    res.status(201).json({
      messageBody: "Logout successfull."
    });
  }else{
    res.status(201).json({
      messageBody: "User has no session (not logged in)"
    });
  }
  
});

// Delete account
router.get('/delete', (req,res)=> {
  let userId = req.session.currentUser._id;
  getAllHerTools(userId)
    .then((toolsList)=>{
      toolsList.forEach(element => {
        let toolId = element._id;
        deleteTool(toolId)
          .then((response)=>{
            console.log(response)
          })
          .catch(err => {
            console.log( `Error, tools which belong tothe user not deleted because: ${err}`)
          })
        });
      });

  User.findByIdAndDelete(userId)
    .then((response)=> {
      res.status(200).json({
        messageBody: "User deleted successfully.",
        data:response
      })
    })
    .catch(err => {
      return ({
        status: 500,
        messageBody: `Error, user not deleted because: ${err}`,
        data: null
      })
    });
})




module.exports = router;