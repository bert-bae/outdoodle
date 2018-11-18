
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('proposed_dates', function(table) {
      table.increments();
      table.date('proposed_start_date');
      table.date('proposed_end_date');
      table.integer('event_id');
      table.foreign('event_id').references('events.id').onDelete('cascade');
    })
  ]);
};

exports.down = function(knex, Promise) {

  return Promise.all([
    knex.schema.dropTable('proposed_dates')
  ]);
};
