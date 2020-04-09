const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User')
const updateInfo = require("../controllers/update-info");

// Update user info inside the app
router.post('/update', (req,res)=>{
  let {status,messageBody,data}= updateInfo(req.body)
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

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(201).json({
    messageBody: "Logout successfull."
  });
});

module.exports = router;