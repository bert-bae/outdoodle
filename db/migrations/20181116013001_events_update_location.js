
exports.up = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
      table.text('location');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('events', function(table) {
      table.dropColumn('location');
  })
};

