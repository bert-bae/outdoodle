
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.text('email').notNullable();
      table.integer('rank_id').unsigned();
      table.foreign('rank_id').references('id').inTable('users').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('email');
    table.dropColumn('rank_id');
  });
};
