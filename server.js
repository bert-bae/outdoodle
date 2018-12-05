"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const session     = require('cookie-session');
var nodemailer = require('nodemailer');
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const eventRoutes = require("./routes/events");

app.use(session({
  name: 'session',
  keys: ["TEST1", "TEST2"],
}));


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/", usersRoutes(knex));
app.use("/events", eventRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get('/events', (req, res) => {
  res.redirect('/');
});

//send an email
app.post('/events/:id/send', function (req, res) {
  console.log('tesssst yo!');
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Midterm060',
      pass: 'Jimmynerdtron2'
    }
  });

  // value is hard coded for now... TODO: finalize event confirmation email section
  const mailOptions = {
    from: 'Midterm060',
    to: 'test@gmail.com',
    subject: 'Gaming Session',
    text: 'Let\'s play some games! November 21st 2pm - 4pm',
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  res.send();
});





app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
