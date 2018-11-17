"use strict";

const express = require('express');
const eventRoutes  = express.Router();
const randomURL = require('../public/scripts/urls.js');
const session     = require('cookie-session');

eventRoutes.use(session({
  name: 'session',
  keys: ["TEST1", "TEST2"],
}));

module.exports = (knex) => {
  eventRoutes.post("/", (req, res) => {
    req.session.temp = req.body.email;
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
    return knex.raw(`SELECT events.name AS event_name, users.name AS user_name, events.location AS location, events.start_date, events.end_date, events.detail, categories.type FROM events_users
      JOIN users ON events_users.user_id = users.id
      JOIN events ON events_users.event_id = events.id
      JOIN categories ON events.categories_id = categories.id
      WHERE events.main_url = 'abcdef';`)
    .then((result) => {
      res.render('event_user', { eventData: result.rows[0] });
    });
  });

  eventRoutes.get("/:id/edit", (req, res) => {
    return knex.raw(`SELECT events.name AS event_name, users.name AS user_name, events.location AS location, events.start_date, events.end_date, events.detail, categories.type FROM events_users
      JOIN users ON events_users.user_id = users.id
      JOIN events ON events_users.event_id = events.id
      JOIN categories ON events.categories_id = categories.id
      WHERE events.main_url = '${req.params.id}';`)
    .then((result) => {
      res.render('event', { eventData: result.rows[0] });
    });
  });

  eventRoutes.post("/:id/edit", (req, res) => {
    res.send("This page should render an edit page for a specific event's page");
  });

  // delete the event
  eventRoutes.post("/:id/delete", (req, res) => {
    knex.raw(`DELETE FROM events
              WHERE main_url = '${req.params.id}'`)
    .then(() => {
      res.redirect('/');
    });
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
    })
    .then(() => {
      return Promise.all([
        knex('events').select('id').where('main_url', eventUrl),
        knex('users').select('id').where('email', req.session.temp),
      ]);
    })
    .then((multiresult) => {
      let event_id = multiresult[0][0].id;
      let user_id = multiresult[1][0].id;
      let userUrl = randomURL();
      return knex('events_users').insert({
        event_id: event_id,
        user_id: user_id,
        short_url: userUrl,
      });
    })
    .then(() => {
      res.send({eventUrl: eventUrl});
    }).catch((err) => {
      res.send({error: err});
    });
  });


  return eventRoutes;
};
