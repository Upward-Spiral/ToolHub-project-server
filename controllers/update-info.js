const User = require('../models/User')

function updateInfo(body,userId){
  let {street1,street2,lotNo,unitNo,city,pcode} = body;
  
  return User
      .findByIdAndUpdate(userId,{
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        phone: body.phone,
        "$set": {
          address: {street1,street2,lotNo,unitNo,city,pcode}
        }
    }, {new:true})
    .then((userData) => {
        // debugger
        console.log(userData)
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

module.exports = updateInfo;
