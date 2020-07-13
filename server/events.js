const pgp = require("pg-promise")(/* options */);
const db = pgp("postgres://postgres@localhost:5432/eventonica");

class EventRecommender {
  getAllUsers() {
    return db.any("SELECT * FROM users");
  }

  getAllEvents() {
    return db.any("SELECT * FROM events");
  }

  addEvent(name, date, category) {
    return db.one(
      "INSERT INTO events (name, date, category) VALUES ($1, $2, $3) RETURNING id, name, date, category",
      [name, date, category]
    );
  }

  addUser(name) {
    return db.one("INSERT INTO users (name) VALUES ($1) RETURNING id, name", [
      name,
    ]);
  }

  getEventById(id) {
    return db.one("SELECT * FROM events WHERE id = $1", [id]);
  }

  saveUserEvent(userId, eventId) {
    return db.one(
      "INSERT INTO user_events (user_id, event_id) VALUES ($1, $2) RETURNING user_id, event_id",
      [userId, eventId]
    );
  }

  getUserById(id) {
    return db.one("SELECT * FROM users WHERE id = $1", [id]);
  }

  deleteUser(id) {
    return db.one("DELETE FROM users WHERE id = $1", [id]);
  }

  deleteEvent(id) {
    return db.one("DELETE FROM events WHERE id = $1", [id]);
  }

  findEventsByDate(date) {
    return db.any("SELECT * FROM events WHERE date = $1", [date]);
  }

  findEventsByCategory(category) {
    return db.any("SELECT * FROM events WHERE category = $1", [category]);
  }
}

// Jasmine test
if (typeof module != "undefined") {
  module.exports = { EventRecommender };
}
