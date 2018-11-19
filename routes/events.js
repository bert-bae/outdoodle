"use strict";

const express = require('express');
const eventRoutes  = express.Router({mergeParams: true});
const randomURL = require('../public/scripts/urls.js');
const bodyParser = require("body-parser");

const session     = require('cookie-session');


eventRoutes.use(session({
  name: 'session',
  keys: ["TEST1", "TEST2"],
}));

module.exports = (knex) => {

  eventRoutes.post("/", (req, res) => {
    req.session.temp = req.body.email;
    knex.raw(`SELECT email FROM users WHERE email = '${req.session.temp}'`)
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

// event edit page (add times for voting)
  eventRoutes.get("/:id/edit", (req, res) => {
    req.session.temp = req.params.id;
    knex.raw(`SELECT *, proposed_dates.id AS time_id FROM proposed_dates
      JOIN events ON events.id = proposed_dates.event_id
      WHERE events.main_url = '${req.session.temp}'
    `)
    .then((result) => {
      if (result.rows.length > 0) {
        let rows = result.rows;
        let startTime = 'proposed_start_time';
        let endTime = 'proposed_end_time';
        let sortedByDate = rows.sort((a, b) => {
          return (a.date.slice(9, 10) - b.date.slice(9, 10));
        });
        let secondSortByTime = sortedByDate.sort((a, b) => {
          return (a[startTime].slice(0, 5) - b[endTime].slice(0, 5));
        });
        res.render('event', { data: result.rows } );
      } else {
        knex.raw(`SELECT * FROM events
          WHERE events.main_url = '${req.session.temp}'
        `)
        .then((result) => {
          res.render('event', { data: result.rows } );
        });
      }
    });
  });

// store proposed date data
  eventRoutes.post("/:id/edit", (req, res) => {
    let date = req.body.slotdate;
    let startTime = req.body.slothr;
    let endTime = req.body.slothr2;
    let mainUrl = req.session.temp;
    knex('events').select('id').where('main_url', mainUrl)
    .then((result) => {
      return knex('proposed_dates').insert({
        proposed_start_time: startTime,
        proposed_end_time: endTime,
        date: date,
        event_id: result[0].id,
        votes: 0,
      }).returning('*')
      .then((result) => {
        res.send( {data: result[0]});
      });
    });
  });

  eventRoutes.post("/:id/vote", (req, res) => {
    let votes = req.body.votes;
    let votesdata = {};
    let name = req.body.userdata[0].value;
    knex.raw(`SELECT email FROM users WHERE email = '${req.body.userdata[1].value}'`)
    .then((result) => {
      if(!result.length) {
        return knex('users').insert({
          name: req.body.userdata[0].value,
          email: req.body.userdata[1].value,
          rank_id: 1
        });
      }
    })
    .then(() => {
      if (votes.length) {
        for (let data of votes) {
          let voteAdd = (Number(data.votecount) + 1);
          let voteId = Number(data.voteid);
          knex.raw(`UPDATE proposed_dates SET votes = ${voteAdd}
            WHERE id = ${voteId}
          `).then();
        }
        res.send( {result: "This works!"} );
      } else {
        res.send("No vote was cast");
      }
    });
  });

// deletes time slot from proposed_dates based on voteid of the element clicked
  eventRoutes.post("/:id/edit/deletetime", (req, res) => {
    let voteid = req.body.voteid;
    knex.raw(`DELETE FROM proposed_dates WHERE id = ${voteid}`)
    .then(() => {
      res.send( {voteid: voteid} );
    });
  });

  eventRoutes.post("/:id/delete", (req, res) => {
    knex.raw(`DELETE FROM events
              WHERE main_url = '${req.params.id}'`)
    .then(() => {
      res.redirect('/');
    });
  });

  // eventRoutes.post("/events/:id/userinfo", (req, res) => {
  //    console.log('HELLLLOOOOO');
  //    knex('users').insert({
  //     email: req.body.uemail,
  //     name: req.body.uname,
  //     rank: 2
  //    })
  // });

  eventRoutes.get("/:id", (req, res) => {
    knex.raw(`SELECT *, proposed_dates.id AS time_id FROM proposed_dates
      JOIN events ON events.id = proposed_dates.event_id
      WHERE events.main_url = '${req.params.id}'
    `).then((result) => {
      let rows = result.rows;
      let startTime = 'proposed_start_time';
      let endTime = 'proposed_end_time';
      let sortedByDate = rows.sort((a, b) => {
        return (a.date.slice(9, 10) - b.date.slice(9, 10));
      });
      let secondSortByTime = sortedByDate.sort((a, b) => {
        return (a[startTime].slice(0, 5) - b[endTime].slice(0, 5));
      });
      res.render('event_user', { data: result.rows } );
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

  eventRoutes.get("/:id/confirm", (req, res) => {
   knex.raw(`SELECT *, events.name AS eventName, users.name AS userName FROM users
      JOIN events_users ON user_id = users.id
      JOIN events ON events.id = event_id
      WHERE events.main_url = '${req.params.id}'`)
    .then((result) => {
    res.render('confirm', {data: result.rows});
    console.log(result.rows);
    });
  });


  return eventRoutes;
};
