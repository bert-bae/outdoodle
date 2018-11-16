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
    // knex.raw(`SELECT events.name, users.name, events.location, events.start_date, events.end_date, events.detail, categories.type FROM events_users
    //   JOIN users ON events_users.user_id = users.id
    //   JOIN events ON events_users.event_id = events.id
    //   JOIN categories ON events.categories_id = categories.id
    //   WHERE events.main_url = ${req.params.id};`)
    // .then((result) => {
    //   res.render('event', result);
    //   console.log(result)
    // });
  });

  eventRoutes.post("/:id/edit", (req, res) => {
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



  eventRoutes.get("/:id", (req, res) => {

    res.render('event');
  });



  eventRoutes.post("/create", (req, res) => {
    let eventUrl = randomURL();
    knex('events').insert({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      img_src: req.body.img,
      location: req.body.location,
      detail: req.body.details,
      name: req.body.eventName,
      categories_id: req.body.category,
      main_url: eventUrl
    }).then(() => {
      res.redirect('/events/' + eventUrl);
    });
  });


  eventRoutes.get("/:id", (req, res) => {
    res.send("This page should render a specific event's page");
  });


  return eventRoutes;
};
