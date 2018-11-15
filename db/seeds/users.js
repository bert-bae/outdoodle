exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({id: 1, name: 'Alice', email: 'testone@gmail.com'}),
        knex('users').insert({id: 2, name: 'Bob', email: 'testtwo@gmail.com'}),
        knex('users').insert({id: 3, name: 'Charlie', email: 'testthree@gmail.com'})
      ]);
    });
};
