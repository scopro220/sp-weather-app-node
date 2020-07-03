const request = require("request");

const forecast = (lat, long, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=b52d9348fadbd868a8c77cbfd7149eb2&query=" +
    lat +
    "," +
    long +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`Unable to connect to weather service!`, undefined);
    } else if (body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      callback(
        undefined,
        `It is ${body.current.weather_descriptions[0]} and currently ${body.current.temperature} degrees.\nIt feels like ${body.current.feelslike} degrees out.\nWinds are out of the ${body.current.wind_dir} at ${body.current.wind_speed} mph.`
      );
    }
  });
};

module.exports = forecast;
