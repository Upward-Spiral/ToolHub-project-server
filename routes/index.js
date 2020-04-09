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
            req.session.user = user;
            res.status(200).json({
              messageBody: "Signup successfull.",
              data: user
            });
        })
        .catch(err => {
          res.status(500).json({
            messageBody: `Error, user not created ${err}`
          });
        });
    }
  });
});


// Check username for uniqueness
router.get('/signup_usernamecheck/:username', (req, res) => {
  let username = req.params.username;
  User
  .findOne({ username: username })
  .then(user => {
    if (user !== null) {
      res.status(201).json({
        messageBody: 'Username already exist. Choose another username!',
      }); 
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
  let email = req.params.email;
  User
  .findOne({ email: email })
  .then(user => {
    if (user !== null) {
      res.status(201).json({
        messageBody: 'email already exist. Choose another email!',
      }); 
    }
  })
  .catch(err => {
    res.status(500).json({
      messageBody: `Error, user not created ${err}`
    });
  });
})

// Check username and password for being the same
router.post('/signup_userpasscheck', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username === password) {
    res.status(400).json({
      messageBody: 'Username and password can not be the same. Please, try again!',
    });
  } 
})

// Double-Check password
router.post('/signup_passdoublecheck', (req, res) => {
  let password_check = req.body.password_check;
  let password = req.body.password;
  if(password_check !== password){
    res.status(401).json ({
      messageBody: 'Password check failed!',
    })
  }
})

// Update user info from Signup (Second page)
router.post('/update-np', (req,res)=>{
  let {status,messageBody,data}= updateInfo(req.body)
  if (status===200) {
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


// Login
router.post('/login', (req, res) => {
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
    .then(user => {
      if (!user) {
        res.status(404).json({
          messageBody: 'This user does not exist. Click on signup if you want to create it.',
        });
      }
      bcrypt.compare(password, user.password, function(err, correctPassword) {
        if (err) res.status(500).json({
          messageBody: `Error, user not logged in because: ${err}`
        });
        else if (!correctPassword) res.status(403).json({
          messageBody: 'Wrong password. Try again!'
        });
        else {
          req.session.currentUser = user;
          res.status(201).json({
            messageBody: "Login successfull.",
            data: user
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        messageBody: `Error, user not logged in because: ${err}`
      })
    });
});



module.exports = router;
