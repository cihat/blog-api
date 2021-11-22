var express = require('express');
var router = express.Router();

const welcomeMessage = `
  <h1>Welcome to my Blog Api</h1>
  <h2>Coming soon...</h2>
  <p>
    This is a simple blog api that I built to learn how to use Node.js and Express.js.
    You can find the source code on <a href="https://github.com/cihat/blog-api" target="_blank">Github</a>.
  </p>
`

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', welcomeMessage });
  res.send({ welcomeMessage });
});

router.get("/api", (req, res) => {
  res.send({ welcomeMessage });
})

module.exports = router;
