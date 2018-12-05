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

  // refactored
  function verifyUser(access, req) {
    return knex('users').insert({
      name: req.body.name,
      email: req.body.email,
      rank_id: access
    })
  }
    
  eventRoutes.post("/", (req, res) => {
    req.session.temp = req.body.email;
    knex.raw(`SELECT email FROM users WHERE email = '${req.session.temp}'`)
    .then((result) => {
      if(result.length) {
        res.send();
      } else {
        verifyUser(1, req).then(() => {
          res.send();
        });
      }
    });
  });

//thank you page
  eventRoutes.get("/thankyou", (req, res) => {
    res.render('thankyou');
  });

// event edit page (add times for voting)
  eventRoutes.get("/:id/edit", (req, res) => {
    req.session.temp = req.params.id;
    knex.raw(`SELECT *, proposed_dates.id AS time_id FROM proposed_dates
      JOIN events ON events.id = proposed_dates.event_id
      WHERE events.main_url = '${req.session.temp}'
      ORDER BY proposed_dates.date, proposed_dates.proposed_start_time
    `)
    .then((result) => {
      if (result.rows.length > 0) {
        let rows = result.rows;
        let startTime = 'proposed_start_time';
        let endTime = 'proposed_end_time';
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

// increment votes based on vote after determining whether votee needs to be entered into the database or not
  eventRoutes.post("/:id/vote", (req, res) => {
    let votes = req.body.votes;
    let votesdata = {};
    let name = req.body.userdata[0].value;
    knex.raw(`SELECT email FROM users WHERE email = '${req.body.userdata[1].value}'`)
    .then((result) => {
      if(!result.length) {
        verifyUser(2, req)
        .then(() => {
          return Promise.all([
            knex('events').select('id').where('main_url', req.session.temp),
            knex('users').select('id').where('email', req.body.userdata[1].value),
          ]);
        }).then((multiresult) => {
          let event_id = multiresult[0][0].id;
          let user_id = multiresult[1][0].id;
          let userUrl = randomURL();
          return knex('events_users').insert({
            event_id: event_id,
            user_id: user_id,
            short_url: userUrl,
          });
        });
      } else {
        return Promise.all([
          knex('events').select('id').where('main_url', req.session.temp),
          knex('users').select('id').where('email', req.body.userdata[1].value),
        ])
        .then((multiresult) => {
          let event_id = multiresult[0][0].id;
          let user_id = multiresult[1][0].id;
          let userUrl = randomURL();
          return knex('events_users').insert({
            event_id: event_id,
            user_id: user_id,
            short_url: userUrl,
          });
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
        res.send( {redirect: req.session.temp} );
      } else {
        res.send( {redirect: req.session.temp} );
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

  eventRoutes.get("/:id", (req, res) => {
    req.session.temp = req.params.id;
    knex.raw(`SELECT *, proposed_dates.id AS time_id FROM proposed_dates
      JOIN events ON events.id = proposed_dates.event_id
      WHERE events.main_url = '${req.params.id}'
      ORDER BY proposed_dates.date, proposed_dates.proposed_start_time
    `).then((result) => {
      let rows = result.rows;
      let startTime = 'proposed_start_time';
      let endTime = 'proposed_end_time';
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

  eventRoutes.post("/:id/confirm", (req, res) => {
    res.send( { redirect: req.session.temp } );
  });

  eventRoutes.get("/:id/confirm", (req, res) => {
    knex.raw(`SELECT *, events.name AS eventName, users.name AS userName FROM users
      JOIN events_users ON user_id = users.id
      JOIN events ON events.id = event_id
      WHERE events.main_url = '${req.params.id}'`)
    .then((result) => {
      res.render('confirm', {data: result.rows});
    });
  });
  return eventRoutes;
};
