const feed = require("feed-read");
const _ = require("lodash");
const cryptoJS = require("crypto-js");

const mailer = require("../utils/mailer");

module.exports = app => {
  app.post("/send-message", async (req, res) => {
    try {
      
      await mailer.sendSystemMail(
        {
          to: process.env.SYSTEM_EMAIL,
          subject: "User feedbacks",
          body: req.body
        },
        err => {
          throw err;
        },
        () => {
          res.send("Success!");
        }
      );
    } catch (err) {
      console.log(err);
      res.status(401).send("Error occured while sending  email.");
    }
  });

  app.get("/blog", (req, res) => {
    feed("https://medium.com/feed/@easyexpresssoft", function(err, articles) {
      if (err) {
        res.status(401).send("error occured!");
        return;
      }
      res.send(articles);
    });
  });

  app.get("/google", (req, res) => {
    try {
      const keys = {
        map: process.env.GOOGLE_MAP_API_KEY,
        video: process.env.GOOGLE_YOUTUBE_API_KEY
      };
      const encrypted = cryptoJS.AES.encrypt(
        JSON.stringify(keys),
        process.env.CRYPTO_KEY
      );

      res.send(encrypted.toString());
    } catch (err) {
      res.send(err.stack);
    }
  });

  app.post("/post", (req, res) => {
    const { postId } = req.body;

    feed("https://medium.com/feed/@easyexpresssoft", function(err, articles) {
      if (err) {
        res.status(401).send("error occured!");
        return;
      }

      const found = _.find(articles, article => {
        const temp = article.link.split("?source=");
        const temp1 = temp[0].split("-");
        const id = temp1[temp1.length - 1];

        return id === postId;
      });

      res.send(found);
    });
  });
};
