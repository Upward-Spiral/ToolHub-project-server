const User = require('../models/User')

function updateProfileImg (userId,newImage) {
  debugger
  return User
    .findOneAndUpdate({_id:userId},{
      $push:{
        images: {
          "$each": [newImage],
          "$position": 0
       }
      }     
    },{new:true})
    .then((userData) => {        
        return ({
          status: 200,
          messageBody: "Update successfull.",
          data: userData
        })
    })
    .catch(err => {
      return ({
        status: 500,
        messageBody: `Error, user not logged in because: ${err}`,
        data: null
      })
    });
}

module.exports = updateProfileImg;