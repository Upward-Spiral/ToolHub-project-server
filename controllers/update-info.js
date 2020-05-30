const User = require('../models/User')

function updateInfo(userInfo,userId){
  debugger
  let {street1,street2,lotNo,unitNo,city,pcode} = userInfo.address[0];
  let {firstname,lastname,displayname,email,phone} = userInfo
  let type = userInfo.locationType
  let locationLatt = Number(userInfo.locationLatt) 
  let locationLong = Number(userInfo.locationLong) 
  let coordinates= [locationLong,locationLatt]
  return User
      .findByIdAndUpdate(userId,{
        firstname: firstname,
        lastname: lastname,
        displayname: displayname,
        phone: phone,
        email: email,
        "$set": {
          address: [{street1,street2,lotNo,unitNo,city,pcode}],
          location: {type,coordinates}
        }
    }, {new:true})
    .then((userData) => {
          console.log(userData)
        return ({
          status: 200,
          messageBody: "Update successfull.",
          data: userData
        })
    })
    .catch(err => {
      console.log(err)
      return ({
        status: 500,
        messageBody: `Error, user not logged in because: ${err}`,
        data: null
      })
    });
}

module.exports = updateInfo;
