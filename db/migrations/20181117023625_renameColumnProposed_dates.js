
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.table('proposed_dates', function(table) {
      table.renameColumn('proposed_start_date', 'proposed_start_time');
      table.renameColumn('proposed_end_date', 'proposed_end_time');
    })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('proposed_dates', function(table) {
      table.dropColumn('proposed_start_time');
      table.dropColumn('proposed_end_time');
    })
    ])
};
