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

  app.post('/login', (req, res, next) => {

  })

  app.route('/countries')
    .get((req, res, next) => {

    })
    .put((req, res, next) => {

    })
    .delete((req, res, next) => {
      
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


