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

app.get("/api/:date?", (req, res) => {
  let dateParam = req.params['date']; // Get the date parameter
  let date;

  // If no date parameter is provided, use the current date
  if (!dateParam) {
    date = new Date();
  } else {
    // Check if the parameter is a valid numeric timestamp
    if (!isNaN(dateParam)) {
      date = new Date(parseInt(dateParam)); // Convert to milliseconds
    } else {
      date = new Date(dateParam); // Assume it's a string date
      console.log(date);
    }
  }

  // Check if the date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return the response
  return (
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    })
  )
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 4000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
