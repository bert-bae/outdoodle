exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('ranks').del(),
    knex('users').del(),
    knex('events_users').del(),
    knex('events').del(),
    knex('categories').del(),
  ])
    .then(function () {
      return Promise.all([
        knex('ranks').insert({id: 1, type: 'admin'}),
        knex('ranks').insert({id: 2, type: 'user'}),

        knex('users').insert({id: 1, name: 'Alice', email: 'testone@gmail.com', rank_id: 1}),
        knex('users').insert({id: 2, name: 'Bob', email: 'testtwo@gmail.com', rank_id: 2}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'testthree@gmail.com', rank_id: 2}),

        knex('categories').insert({id: 1, type: 'social'}),
        knex('categories').insert({id: 2, type: 'virtual'}),
        knex('categories').insert({id: 3, type: 'business'}),

        knex('events').insert({id: 1, start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name One', categories_id: 1}),
        knex('events').insert({id: 2, start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Two', categories_id: 2}),
        knex('events').insert({id: 3, start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Three', categories_id: 3}),

        knex('events_users').insert({event_id: 1, user_id: 1}),
        knex('events_users').insert({event_id: 2, user_id: 3}),
        knex('events_users').insert({event_id: 3, user_id: 2}),
      ]);
    });
};
