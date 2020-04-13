const express = require('express');
const router  = express.Router();
const getGeoJsonLocation = require ('../controllers/get-location')
const Client = require("@googlemaps/google-maps-services-js").Client;
const axios = require('axios');
const client = new Client({});

router.post('/get-geo', (req, res, next) => {
  debugger
    let theAddress = req.body.address
    console.log(theAddress)

  // axios
  //   .get('https://maps.googleapis.com/maps/api/geocode/json', {
  //     params: {
  //       address: "schepen oppenwervestraat 149, 6831 Mk Arnhem",
  //       key: process.env.GOOGLE_MAPS_API_KEY
  //     }
  //   })
  getGeoJsonLocation(theAddress)
  .then((res) => {
    
    res.json(res)
  }).catch((err) => {
    res.json({error: err})
  });
  
});



module.exports = router;