const Tool  = require ('../models/Tool');

function FormReserveLine(toolId,reserverList) {
  debugger
  return Tool.findByIdAndUpdate({_id:toolId}, {
            $push:{
              reserved_by: {
                "$each": reserverList
                // "$position": 0
            }
            } 
          },{new:true})
            .populate('reserved_by')
            //.select('reserved_by requested_by')
              .then((ListData) => { 
                ListData.requested_by.splice(0)
                ListData.save()
                  .then((finalListData)=>{
                    // some sort of confirmation should be requested from the requester 
                    //to see if they want to be in the reserve list
                    console.log(finalListData)
                    return (finalListData)
                  })
                  .catch((err)=>{
                    console.log(err)
                    return undefined
                  }) 
              })
              .catch((err)=>{
                console.log('second catch in controller',err)
                return err
              })
}

module.exports = FormReserveLine