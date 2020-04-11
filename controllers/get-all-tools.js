const User  = require('../models/User');
const Tool  = require ('../models/Tool');

function getAllHerTools (userId) {
  return Tool.find({owner:userId})
      
          .then((toolList)=>{
            return toolList
          })
          .catch((err)=>{
            console.log(err)
            return undefined
          })
}

module.exports = getAllHerTools;