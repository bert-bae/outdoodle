
exports.up = function(knex, Promise) {
  return knex.schema.table('proposed_dates', function(table) {
    table.dropColumn('proposed_start_time');
    table.dropColumn('proposed_end_time');
    table.dropColumn('date');
  }).then(() => {
    return knex.schema.table('proposed_dates', function(table) {
      table.text('proposed_start_time');
      table.text('proposed_end_time');
      table.text('date');
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('proposed_dates', function(table) {
    table.dropColumn('proposed_start_time');
    table.dropColumn('proposed_end_time');
    table.dropColumn('date');
  }).then(() => {
    return knex.schema.table('proposed_dates', function(table) {
      table.text('proposed_start_time').notNullable();
      table.text('proposed_end_time').notNullable();
      table.text('date').notNullable();
    });
  });
};
