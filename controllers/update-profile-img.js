const User = require('../models/User')

function updateProfileImg (userId,file) {
  const imgPath = file.url;
  const imgName = file.originalname;
  var newImage = {"imgName":imgName, "imgPath":imgPath};
  return User
    .findById(userId)
    .then((userData) => {
        // debugger
        userData.images.push(newImage);
        userData.save()
          .then((userData)=> {
            console.log(userData)
          })
          .catch(err => {
            console.log(err)
          });
        
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