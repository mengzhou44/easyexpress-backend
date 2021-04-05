require("dotenv").config();

const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

require("./routes/public")(app);
require("./routes/feeds")(app);
require("./routes/weather")(app);

app.get("/", (req, res) => {
  res.send(`
  <div>
    <h1>
       Easy Express Backend is Running...  Version 2.6
    </h1>
    <p>
      Environment: ${process.env.ENVIRONMENT}
    </p>
    <p>
      Connection string: ${process.env.CONNECTION_STRING}
    </p>
  </div>
  `);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, error => {
  if (error) throw error;
  console.log("Server running on port: " + PORT);
});
