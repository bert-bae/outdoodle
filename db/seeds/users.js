exports.seed = function(knex, Promise) {
  return knex('events_users').del()
    .then(() => {
      return knex('events').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('ranks').del();
    })
    .then(() => {
      return knex('categories').del();
    })

    .then(function () {
      return knex('ranks').insert([{
        type: 'admin'
      }, {
        type: 'user'
      }]);
    })

    .then(function () {
      return knex('categories').insert([{
        type: 'social'
      }, {
        type: 'virtual'
      }, {
        type: 'business'
      }]);
    })

    .then(function () {
      return knex('users').insert([{
        name: 'Alice', email: 'testone@gmail.com', rank_id: 1
      }, {
        name: 'Bob', email: 'testtwo@gmail.com', rank_id: 2
      }, {
        name: 'Charlie', email: 'testthree@gmail.com', rank_id: 2
      }]);
    })

    .then(function () {
      return knex('events').insert([{
        start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name One', categories_id: 1, location: 'Vancouver'
      }, {
        start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Two', categories_id: 2, location: 'Abbotsford'
      }, {
        start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Three', categories_id: 3, location: 'Surrey'
      }]);
    })

    .then(function () {
      return knex('events_users').insert([{
        event_id: 1, user_id: 1
      }, {
        event_id: 2, user_id: 2
      }, {
        event_id: 3, user_id: 3
      }]);
    });
  };
