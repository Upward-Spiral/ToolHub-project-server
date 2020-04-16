const User = require('../models/User')

function updateInfo(body,userId){
  debugger
  let {street1,street2,lotNo,unitNo,city,pcode} = body;
  let type = body.locationType
  let locationLatt = Number(body.locationLatt) 
  let locationLong = Number(body.locationLong) 
  let coordinates= [locationLong,locationLatt]
  // let theLocation = {type,coordinates}
  return User
      .findByIdAndUpdate(userId,{
        firstname: body.firstname,
        lastname: body.lastname,
        phone: body.phone,
        "$set": {
          address: {street1,street2,lotNo,unitNo,city,pcode},
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
