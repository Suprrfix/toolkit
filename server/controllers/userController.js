const request = require('request');


exports.loginApi = function (req, res, next) {
    
    // Make a POST request to optimus microservice

    console.log("-----login controller----")
    console.log(req.body);

    request.post({
      url: "http://optimus-internal.suprrfix.com/api/v1/signin",
      body: req.body, // Send the request body from the client to the backend microservice
      json: true // Set this to true to send the request body as JSON
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // If the backend microservice responds with status code 200, send the body back to the client
        res.send(body);
      } else {
        // If there's an error or the response status code is not 200, send an error response to the client
        res.status(response.statusCode || 500).json(error || { error: "Something went wrong" });
      }
    });
  }