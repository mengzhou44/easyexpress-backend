const _ = require("lodash");

const forecast = require("../utils/forecast");

module.exports = app => {
  app.post("/weather", (req, res) => {
    try {
      const { latitude, longitude } = req.body;
      forecast(
        {
          latitude,
          longitude
        },
        response => {
          if (response.success === true) {
            return res.status(200).send({
              summary: response.summary,
              temperature: response.temperature,
              precipProbability: response.precipProbability
            });
          } else {
            throw new Error("unable to forecast weather!");
          }
        }
      );
    } catch (err) {
      res.status(401).send(err);
    }
  });
};
