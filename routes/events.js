"use strict";

const express = require('express');
const eventRouter  = express.Router();

module.exports = (knex) => {

  eventRouter.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  return eventRouter;
};
