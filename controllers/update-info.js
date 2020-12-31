const User = require('../models/User');
var qs     = require('qs');

function updateInfo(userInfo,userId){
  debugger
  let user = qs.parse(userInfo)
  let {street1,street2,lotNo,unitNo,city,pcode} = user.address[0];
  let {firstname,lastname,displayname,email,phone} = user
  let type = user.locationType
  let locationLatt = Number(user.locationLatt) 
  let locationLong = Number(user.locationLong) 
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
