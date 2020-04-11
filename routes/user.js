const express           = require('express');
const router            = express.Router();
// const bcrypt = require('bcrypt');
const User              = require ('../models/User')
const updateInfo        = require ("../controllers/update-info");
const updateProfileImg  = require ('../controllers/update-profile-img');
const getAllHerTools    = require ('../controllers/get-all-tools');
const deleteTool        = require ('../controllers/delete-tool');
const uploadCloud       = require ('../config/cloudinary.js');

// Update user info inside the app
router.post('/update', uploadCloud.single('user-img'), (req,res)=>{

  let userId = req.session.currentUser._id;
  if (!req.file) {
    updateInfo(req.body,userId)
      .then((response) => {
        let {status,messageBody,data}= response;
        if (status === 200) {
          res.status(200).json({
            messageBody: messageBody,
            data:data
          })
        } else {
          res.status(500).json({
              messageBody: messageBody
            });
        }
      })
  } else {
    updateProfileImg(userId,req.file)
    .then((response) => {
      let {status,messageBody,data}= response;
      if (status === 200) {
        res.status(200).json({
          messageBody: messageBody,
          data:data
        })
      } else {
        res.status(500).json({
            messageBody: messageBody
          });
      }
    })

  }

   
  
})

// Get profile
router.get('/profile', (req,res)=>{
  let userId = req.session.currentUser._id;
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

// Get list of all her tools
router.get('/toolshed/:id', (req,res)=> {
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

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(201).json({
    messageBody: "Logout successfull."
  });
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
            console.log( `Error, user deleted because: ${err}`)
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
        messageBody: `Error, user deleted because: ${err}`,
        data: null
      })
    });
})



module.exports = router;