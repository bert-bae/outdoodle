
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ranks', function(table) {
      table.increments();
      table.text('type').notNullable();
    }),
    knex.schema.createTable('categories', function(table) {
      table.increments();
      table.text('type').notNullable();
    }),
    knex.schema.createTable('events', function(table) {
      table.increments();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.text('detail');
      table.text('name').notNullable();
      table.integer('categories_id').unsigned();
      table.foreign('categories_id').references('id').inTable('categories').onDelete('CASCADE');
    }),
    knex.schema.createTable('events_users', function(table) {
      table.integer('user_id').unsigned();
      table.integer('event_id').unsigned();
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.foreign('event_id').references('id').inTable('events').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events_users'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('categories'),
    knex.schema.dropTable('ranks'),
  ]);
};
