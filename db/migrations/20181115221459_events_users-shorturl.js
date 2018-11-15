
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events_users', function(table) {
      table.text('short_url')
    }),
    knex.schema.table('events', function(table) {
      table.text('main_url')
    })
  ]);

};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events_users', function(table){
      table.dropColumn('short_url');
    }),
    knex.schema.table('events', function(table){
      table.dropColumn('main_url');
    })
  ]);
};
