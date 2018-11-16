
// Event name based on event id
knex('events').select(name).where('event.id', id);

// event details based on event id
knex('events').select(name).where('event.id', id);

// location based on userid and eventid
SELECT user.name, location FROM users
JOIN events_users ON users.id = events_users.user_id
JOIN events ON events.id = events_users.event_id
WHERE events.id = id
