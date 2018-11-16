"use strict";

const express = require('express');
const eventRoutes  = express.Router();
const randomURL = require('../public/scripts/urls.js');

module.exports = (knex) => {

  eventRoutes.get("/", (req, res) => {
    res.send("This is for the AJAX request for the event creation page");
  });

  eventRoutes.post("/", (req, res) => {
    knex('users').select('email').where('email', req.body.email)
    .then((result) => {
      if(result.length) {
        res.send();
      } else {
        knex('users').insert({
          name: req.body.name,
          email: req.body.email,
          rank_id: 1
        }).then(() => {
          res.send();
        });
      }
    });
  });

  eventRoutes.get("/:id", (req, res) => {
    res.send("This page should render a specific event's page");
  });

  eventRoutes.post("/:id", (req, res) => {
    let eventUrl = randomURL();
    knex('events').insert({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      detail: req.body.details,
      name: req.body.eventName,
      categories: req.body.category,
      location: req.body.location,
      main_url: eventUrl
    }).then(() => {
      res.send();
    });
  });


  eventRoutes.get("/:id/edit", (req, res) => {
    res.send("This page should render an edit page for a specific event's page");
  });

  // delete the event
  eventRoutes.post("/:id/delete", (req, res) => {
    res.send("This should delete the event and then redirect");

    let user = {
      name: name,
      email: email,
    };
    knex('users').table('');
  });


  return eventRoutes;
};

