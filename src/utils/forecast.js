const request = require("request");

const forecast = ({ latitude, longitude }, callback) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, { body }) => {
    let result = {};
    if (error) {
      result = {
        success: false,
        message: "Unable to connect to weather service!"
      };
    } else if (body.error) {
      result = {
        success: false,
        message: "Unable to connect to weather service!"
      };
    } else {
      result = {
        success: true,
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      };
    }

    callback(result);
  });
};

module.exports = forecast;
