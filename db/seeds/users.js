exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('users').del(),
    knex('ranks').del(),
    knex('categories').del(),
    knex('events').del(),
  ])
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'testone@gmail.com', rank_id: 'admin'}),
        knex('users').insert({id: 2, name: 'Bob', email: 'testtwo@gmail.com', rank_id: 'user'}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'testthree@gmail.com', rank_id: 'user'}),

        knex('ranks').insert({id: 1, type: 'admin'}),
        knex('ranks').insert({id: 2, type: 'user'}),

        knex('categories').insert({id: 1, type: 'social'}),
        knex('categories').insert({id: 2, type: 'virtual'}),
        knex('categories').insert({id: 3, type: 'business'}),

        knex('events').insert({id: 1, start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name One'}),
        knex('events').insert({id: 2, start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Two'}),
        knex('events').insert({id: 3, start_date: new Date(), end_date: new Date(), detail: 'Have fun', name: 'Name Three'}),
      ]);
    });
};
