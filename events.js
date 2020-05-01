class EventRecommender {
  constructor() {
    this.events = [];
    this.users = [];
  }

  addEvent(id, name, date, category) {
    let newEvent = new Event(id, name, date, category);
    this.events.push(newEvent);
  }

  addUser(id, name) {
    let newUser = new User(id, name);
    this.users.push(newUser);
  }

  getEventById(id) {
    return this.events.find((event) => event.id === id);
  }

  saveUserEvent(userId, eventId) {
    let user = this.users.find((item) => item.id === userId);
    let event = this.events.find((item) => item.id === eventId);
    user.personalEvents.push(event);
    console.log(user);
  }

  getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  deleteUser(id) {
    let usersLeft = this.users.filter(function (user) {
      return user.id !== id;
    });
    this.users = usersLeft;
  }

  deleteEvent(id) {
    let eventsLeft = this.events.filter(function (event) {
      return event.id !== id;
    });
    this.events = eventsLeft;
  }

  findEventsByDate(date) {
    let allEvents = this.events.filter(function (event) {
      return event.date === date;
    });
    return allEvents;
  }

  findEventsByCategory(category) {
    let eventsByCategory = this.events.filter(function (event) {
      return event.category === category;
    });
    return eventsByCategory; // an array
  }
}

class User {
  constructor(id, name) {
    this.name = name;
    this.id = id;
    this.personalEvents = [];
  }
}

class Event {
  constructor(id, name, date, category) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.category = category;
  }
}

// Jasmine test
if (typeof module != "undefined") {
  module.exports = { EventRecommender, User, Event };
}
