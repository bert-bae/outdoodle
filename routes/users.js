"use strict";

const express = require('express');
const router  = express.Router({ mergeParams: true });

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/hello", (req, res) => {
    res.send("Hello");
  });

  return router;
};
