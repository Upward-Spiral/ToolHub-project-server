const express = require('express');
const router  = express.Router();
const updateInfo = require("../controllers/update-info");
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Signup
router.post('/signup', (req, res, next) => {
  const {username, displayname, password, email } = req.body;
  if (username === '' || password === '') {
    res.status(400).json({
      messageBody: 'Indicate a username and a password to sign up'
    });
    return;
  }

  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      res.status(500).json({
        messageBody: `Hashing error occured.  ${err}`
      });
    } else {
      User
        .create({
          email:email,
          displayname: displayname,
          username: username,
          password: hash,
        })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
          res.status(500).json({
            messageBody: `Error, user not created ${err}`
          });
        });
    }
  });
});
 
// Update user info from Signup (Second page)
router.post('/update-np', (req,res)=>{
  let userId = req.body._id
  updateInfo(req.body, userId)
   .then((response)=> {
    let {status,messageBody,data}= response;
    if (status===200) {
      console.log(messageBody)
      res.status(200).json(data)
    } else {
      res.status(500).json({
          messageBody: messageBody
        });
    }
   })
   .catch(err => {
      res.status(500).json({
        messageBody: `Error, user not logged in because: ${err}`
      })
    });
})

// Check username for uniqueness
router.get('/signup_usernamecheck/:username', (req, res) => {
  debugger
  let username = req.params.username;
  User
  .findOne({ username: username })
  .then(user => {
    if (user !== null) {
      res.status(204).json({
        messageBody: 'Username already exist. Choose another username!',
      }); 
    } else {
      res.status(200).json({
        messageBody: 'Username is free to take!',
      })
    }
  })
  .catch(err => {
    res.status(500).json({
      messageBody: `Error, user not created ${err}`
    });
  });
})

// Check email for uniqueness
router.get('/signup_emailcheck/:email', (req, res) => {
  debugger
  let email = req.params.email;
  User
  .findOne({ email: email })
    .then(user => {
      if (user !== null) {
        res.status(204).json({
          messageBody: 'email already exist. Choose another email!',
        }); 
      } else {
        res.status(200).json({
          messageBody: 'Username is free to take!',
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, email check failed because: ${err}`
      });
    });
})

// Login
router.post('/login', (req, res) => {
  debugger
  const {username, password} = req.body;
  if (username === '' || password === ''){
    res.status(401).json({
      messageBody: 'Indicate a username and a password to log in'
    });
    return;
  }
  User
    .findOne({
        username
    })
    .populate("buddies")
    .then(user => {
      if (!user) {
        res.status(204).json({
          messageBody: 'This user does not exist. Click on signup if you want to create it.'
        });
      } else {
        bcrypt.compare(password, user.password, function(err, correctPassword) {
          if (err) 
            res.status(500).json({
            messageBody: `Error, user not logged in because: ${err}`
          });
          else if (!correctPassword) 
            res.status(203).json({
            messageBody: 'Wrong password. Try again!'
          });
          else {
            req.session.currentUser = user;
            res.status(201).json(user);
          }
        });
      }
      
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, user not logged in because: ${err}`
      })
    });
});



module.exports = router;
