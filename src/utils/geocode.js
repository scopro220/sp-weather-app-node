const request = require("request");

const geoCode = (location, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(location) +
    ".json?access_token=pk.eyJ1Ijoic2NvcHJvMTQiLCJhIjoiY2tjNHZoNGFlMGJ1aDJxbXMybmkxdGtnMiJ9.Gsgr-KShWrIfLRdnB-ZmKw";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to geocoding service!`, undefined);
    } else if (body.features.length < 1) {
      callback(`Unable to find location, Try another search`, undefined);
    } else {
      const cityLocation = body.features[0].place_name;
      const latitude = body.features[0].center[1];
      const longitude = body.features[0].center[0];
      callback(undefined, {
        city: cityLocation,
        latitude: latitude,
        longitude: longitude,
      });
    }
  });
};

module.exports = geoCode;
