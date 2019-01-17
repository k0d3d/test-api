/*
Main application entry point
 */

// pull in the package json

// REQUIRE SECTION
const express = require('express');
const app = express();
  // routes = require('./controllers/routes'),
const  methodOverride = require('method-override');
const  bodyParser = require('body-parser');
const  jwt = require("jsonwebtoken");
// const

// sessionless stub
let countries = []
let ourSecretShhhhh = "super-secret";

// set version

// port
var port = process.env.PORT || 3000;


function loadMiddleWare() {

  // signed cookies

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  app.use(methodOverride());

  app.route('/routetest')
    .get(function (req, res) {
      res.send('Server is running');
    });
  
  // as per the requirements of the test
  // the method the middleware checks for 
  // the token is not specified. 
  // For simplicity, ill use a bearer token
  // and a query param 'token'
  // 
  const authenticate = () =>  (req, res, next) => {
    console.log('chai')
    let token
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      token = req.query.token;
    }

    // verify a token symmetric
    jwt.verify(token, ourSecretShhhhh, function (err, decoded) {
      if (err) return res.status(500).send(err)
      if (decoded.username === 'admin' && decoded.password === 'admin') return next()
      console.log(decoded) // lets see what creds we sent
      res.status(401).send('unauthorized')
    });

  }


  app.post('/login', (req, res, next) => {
    if (req.body.username === "admin" &&
        req.body.password === "admin") {
          let token = jwt.sign(
            { 
              "username": "admin", 
              "password": "admin"
            }, ourSecretShhhhh);
          res.status(200).send(token)
    } else {
      res.status(401).send('Unauthorized')
    }
    
  })

  app.route('/countries',)
    .get(authenticate(), (req, res, next) => {
      res.json(countries)
    })
    .put(authenticate(), (req, res, next) => {
      if (!req.body.country) return res.status(400).send('expected json with "country" property')
      countries.push(req.body.country);
      res.json(countries)
    })
    .delete(authenticate(), (req, res, next) => {
      if (!req.body.country) return res.status(400).send('expected json with "country" property')
      countries.indexOf(req.body.country)
      res.json(countries)
    })

  app.use(function (req, res) {
    if (req.xhr) {
      res.status(404).json({ message: 'resource not found' });
    } else {
      res.status(404).json({
        url: req.originalUrl,
        error: 'Not found'
      });
    }

  })

}


//load resource
loadMiddleWare();

// actual application start
app.listen(port);
console.log('Tag Chief Service started on port ' + port);

// CATASTROPHIC ERROR
app.use(function (err, req, res) {

  console.error(err.stack);

  // make this a nicer error later
  res.status(500).send('Getting some tape and glue');

});


