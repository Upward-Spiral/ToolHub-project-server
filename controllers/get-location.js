const axios = require('axios');


const googleGeoCodingApi = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
  headers: {'content-type': 'application/x-www-form-urlencoded'}
});

function getGeoJsonLocation (theAddress) {
  debugger
  return axios
          ({
            method: "GET",
            params:{
                address: theAddress,
                key: ""
            }
        })
        .then((res) => {
            console.log(res)
            const latitude = res.data.results[0].geometry.location.lat;
            const longitude = res.data.results[0].geometry.location.lng;
            console.log({lat:latitude,lon:longitude})
            return({lat:latitude,lon:longitude})
            
        }).catch((err) => {
            console.log(err)
            return ({lat:0,lon:0})
        });
}

function extractLatLon (geoCode) {
  let latLonCode = geoCode.geometry.location
  console.log(latLonCode)
  return latLonCode
}

module.exports = getGeoJsonLocation;