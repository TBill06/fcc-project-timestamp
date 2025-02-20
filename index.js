// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API endpoint for empty date
app.get("/api", (req, res) => {
  res.json({unix: Date.now(), utc: Date()});
});

// API endpoint for date string
app.get("/api/:date", (req, res) => {
  let date = req.params.date
  let reg = /\d{5,}/;
  if (reg.test(date)) {
    date = parseInt(date)
  }
  let dateObject = new Date(date)
  if (dateObject == "Invalid Date") {
    res.json({error: "Invalid Date"})
  } else {
    res.json({unix: dateObject.getTime(), utc: dateObject.toUTCString()})
  }
});

// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
