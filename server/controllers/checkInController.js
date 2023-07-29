const request = require('request');

const optimus = process.env.optimus_backend;

exports.checkInDetails = function (req, res, next) {    

    const authToken = req.headers.authorization;
  
    if (!authToken) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    const checkInId = req.params.id;
  
      // Options for the GET request with the authorization header
    const options = {
      url: optimus + `/api/v1/check_in/${checkInId}/details`,
      headers: {
        Authorization: authToken, // Add the authorization token to the headers
      },
    };
  
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // If the backend microservice responds with status code 200, send the body back to the client
          res.send(body);
        } else {
          // If there's an error or the response status code is not 200, send an error response to the client
          res.status(response.statusCode || 500).json(error || { error: "Something went wrong" });
        }
      });
  }

exports.incompleteCheckIns = function (req, res, next) {    

    const authToken = req.headers.authorization;
  
    if (!authToken) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }
  
    const garageId = req.params.id;
      // Options for the GET request with the authorization header
    const options = {
      url: optimus + `/api/v1/incomplete_checkins/${garageId}`,
      headers: {
        Authorization: authToken, // Add the authorization token to the headers
      },
    };
  
      request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // If the backend microservice responds with status code 200, send the body back to the client
          res.send(body);
        } else {
          // If there's an error or the response status code is not 200, send an error response to the client
          res.status(response.statusCode || 500).json(error || { error: "Something went wrong" });
        }
      });
  }

  exports.createCheckIn = function (req, res, next) {    

    const authToken = req.headers.authorization;
  
    if (!authToken) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }      
      // Options for the GET request with the authorization header
    const options = {
      url: optimus + `/api/v1/create/check_in`,
      body: req.body,
      json: true,
      headers: {
        Authorization: authToken, // Add the authorization token to the headers
      },
    };
  
      request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // If the backend microservice responds with status code 200, send the body back to the client
          res.send(body);
        } else {
          // If there's an error or the response status code is not 200, send an error response to the client
          res.status(response.statusCode || 500).json(error || { error: "Something went wrong" });
        }
      });
  }

  exports.createBillItems = function (req, res, next) {    

    const authToken = req.headers.authorization;
  
    if (!authToken) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }      
      // Options for the GET request with the authorization header
    
    const options = {
      url: optimus + `/api/v1/create/bill/items`,
      body: req.body,
      json: true,
      headers: {
        Authorization: authToken, // Add the authorization token to the headers
      },
    };
  
      request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // If the backend microservice responds with status code 200, send the body back to the client

          console.log("======create bill=====")          
          console.log(body);

          res.send(body);
        } else {
          // If there's an error or the response status code is not 200, send an error response to the client
          res.status(response.statusCode || 500).json(error || { error: "Something went wrong" });
        }
      });
  }