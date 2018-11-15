"use strict";

const express = require('express');
const eventRoutes  = express.Router();

module.exports = (knex) => {

  eventRoutes.get("/", (req, res) => {
    res.send("This is for the AJAX request for the event creation page");
  });

  eventRoutes.post("/", (req, res) => {
    res.send('Hello');
  });

  eventRoutes.get("/:id", (req, res) => {
    res.send("This page should render a specific event's page");
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
