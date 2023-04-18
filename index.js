// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get("/api/", function (req, res) {

  let date = new Date();
  res.json(convertStringToTimestampJson(date.getTime().toString()));
});


// your first API endpoint... 
app.get("/api/:format", function (req, res) {

  res.json(convertStringToTimestampJson(req.params.format));
});


function convertStringToTimestampJson(dateString = "") {

  if (dateString.search("-") == -1) {
    let newDate = new Date(parseInt(dateString))
    let json = {}
    if (newDate.toString() == "Invalid Date") {
      json = {
        error: newDate.toString()
      }
    } else {
      json = {
        unix: newDate.getTime(),
        utc: newDate.toUTCString()
      }
    }


    return json


  } else {
    let chunks = dateString.split("-")
    let newDate = new Date(chunks[0], chunks[1] - 1, chunks[2])
    let json = {}
    if (newDate.toString() == "Invalid Date" || chunks.length != 3) {
      json = {
        error: "Invalid Date"
      }
    } else {
      json = {
        unix: newDate.getTime(),
        utc: newDate.toUTCString()
      }
    }

    return json
  }

}



// listen for requests :)
// TODO process.env.PORT add this in first argument
var listener = app.listen(8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
