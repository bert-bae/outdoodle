exports.seed = function(knex, Promise) {
  return knex('events_users').del()
    .then(knex('proposed_times').del())
    .then(knex('events').del())
    .then(knex('users').del())
    .then(knex('ranks').del())
    .then(knex('categories').del())

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
      return knex('categories').insert([{
        type: 'social', id: 1
      }, {
        type: 'virtual', id: 2
      }, {
        type: 'business', id: 3
      }]);
    })

    .then(function () {
      return knex('ranks').insert([{
        type: 'admin', id: 1
      }, {
        type: 'user', id: 2
      }]);
    })

    .then(function () {
      return knex('users').insert([{
        name: 'Alice', email: 'testone@gmail.com', rank_id: 1, id: 1
      }, {
        name: 'Bob', email: 'testtwo@gmail.com', rank_id: 2, id: 2
      }, {
        name: 'Charlie', email: 'testthree@gmail.com', rank_id: 2, id: 3
      }]);
    })

    .then(function () {
      return knex('events').insert([{
        start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name One', categories_id: 1, location: 'Vancouver', img_src: 'image', main_url: 'abcdef', id: 1
      }, {
        start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Two', categories_id: 2, location: 'Abbotsford', img_src: 'image', main_url: 'ghijkl', id: 2
      }, {
        start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Three', categories_id: 3, location: 'Surrey', img_src: 'image', main_url: 'mnopqrs', id: 3
      }]);
    })

    .then(function () {
      return knex('events_users').insert([{
        event_id: 1, user_id: 1, short_url: 'asdfgh'
      }, {
        event_id: 2, user_id: 2, short_url: 'qwerty'
      }, {
        event_id: 3, user_id: 3, short_url: 'zxcvbn'
      }]);
    });
  };
