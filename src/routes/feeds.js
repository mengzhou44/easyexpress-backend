const feed = require('feed-read');
 
module.exports = app => {
 
  app.get('/feed', (req, res) => {
 
    feed(req.query.url, function(err, articles) {
 
      if (err) {
        res.status(401).send('error occured!');
      } else {
        res.send(articles);
      }
    });
  });
};
