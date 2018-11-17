
exports.up = function(knex, Promise) {
  return knex.schema.table('proposed_dates', function(table) {
    table.date('date');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('proposed_dates', function(table) {
    table.dropColumn('date');
  })
};
