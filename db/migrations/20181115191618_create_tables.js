
exports.up = function(knex, Promise) {

  function createRanksTable() {
    return knex.schema.createTable('ranks', function(table) {
      table.increments();
      table.text('type').notNullable();
    });
  }

  function createCategoriesTable() {
    return knex.schema.createTable('categories', function(table) {
      table.increments();
      table.text('type').notNullable();
    });
  }

  function createUsersTable() {
    return knex.schema.createTable('users', function(table) {
      table.increments();
      table.text('name').notNullable();
      table.text('email').notNullable();
      table.integer('rank_id').unsigned();
      table.foreign('rank_id').references('ranks.id');
    });
  }

  function createEventsTable() {
    return knex.schema.createTable('events', function(table) {
      table.increments();
      table.date('start_date').notNullable();
      table.date('end_date').notNullable();
      table.text('img_src');
      table.text('detail');
      table.text('name').notNullable();
      table.integer('categories_id').unsigned();
      table.foreign('categories_id').references('categories.id');
    });
  }

  function createEventUserJoinTable() {
    return knex.schema.createTable('events_users', function(table) {
      table.integer('user_id').unsigned();
      table.integer('event_id').unsigned();
      table.foreign('user_id').references('users.id');
      table.foreign('event_id').references('events.id');
    });
  }

  return createRanksTable()
    .then(createCategoriesTable)
    .then(createEventsTable)
    .then(createUsersTable)
    .then(createEventUserJoinTable);
};

exports.down = function(knex, Promise) {
  function dropRanksTable() {
    return knex.schema.dropTable('ranks');
  }

  function dropCategoriesTable() {
    return knex.schema.dropTable('categories');
  }

  function dropUsersTable() {
    return knex.schema.dropTable('users');
  }

  function dropEventsTable() {
    return knex.schema.dropTable('events');
  }

  function dropEventUserJoinTable() {
    return knex.schema.dropTable('events_users');
  }


  return dropEventUserJoinTable()
    .then(dropEventsTable)
    .then(dropUsersTable)
    .then(dropRanksTable)
    .then(dropCategoriesTable);
};
