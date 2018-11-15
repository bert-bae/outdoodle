
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('users', function(table){
      table.text('email').notNullable();
      table.integer('rank_id').unsigned();
      table.foreign('rank_id').references('ranks.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.dropColumn('email');
    table.dropForeign('rank_id', 'ranks.id');
    table.dropColumn('rank_id');
  });
};
