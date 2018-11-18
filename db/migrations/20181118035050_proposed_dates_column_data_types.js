
exports.up = function(knex, Promise) {
  return knex.schema.dropTableIfExists('proposed_dates')
  .then(() => {
    return knex.schema.createTable('proposed_dates', function(table) {
      table.text('proposed_start_time').notNullable();
      table.text('proposed_end_time').notNullable();
      table.text('date').notNullable();
      table.integer('votes');
      table.integer('event_id').unsigned();
      table.increments();
      table.foreign('event_id').references('events.id');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('proposed_dates');
};
