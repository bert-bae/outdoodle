"use strict";

const express = require('express');
const eventRoutes  = express.Router();
const randomURL = require('../public/scripts/urls.js');

module.exports = (knex) => {

  eventRoutes.get("/", (req, res) => {
    res.send("This is for the AJAX request for the event creation page");
  });

  eventRoutes.post("/", (req, res) => {
    knex('users').insert({
      name: req.body.name,
      email: req.body.email,
      rank_id: 1
    });
    res.send();
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

  //querying data

// rows.forEach(function (value) {

// })
  // knex.SELECT('events.name').FROM('events').
  //     .JOIN('events_users')
  //     .ON(event_id = event.id)
  //     .JOIN('users')
  //     .ON(users.id = user_id)
  //     .WHERE()


  eventRoutes.get("/:id", (req, res) => {
    // let templateVars = {
    //   eventName:

    // }
    res.render('event');
  });



  eventRoutes.post("/create", (req, res) => {
    let eventUrl = randomURL();
    knex('events').insert({
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      img_src: req.body.img,
      detail: req.body.details,
      name: req.body.eventName,
      categories: req.body.category,
      main_url: eventUrl
    })
    // .then(() => {
      // res.redirect('/events/' + eventUrl);
    // });
  });

  eventRoutes.get("/:id", (req, res) => {
    res.send("This page should render a specific event's page");
  });



  return eventRoutes;
};
