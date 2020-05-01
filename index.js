const express = require("express");
const bodyParser = require("body-parser");
const { EventRecommender, User, Event } = require("./events");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  next();
});

const port = 3000;

const er = new EventRecommender();

// events
app.get("/events", (req, res) => {
  res.status(200).send(er.events);
});

app.post("/events", (req, res) => {
  const { id, name, date, category } = req.body;
  er.addEvent(id, name, date, category);
  res.status(200).send("Event added successfully");
});

app.get("/events/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(er.getEventById(id));
});

app.delete("/events/:id", (req, res) => {
  let id = req.params.id;
  er.deleteEvent(id);
  res.status(200).send("Event deleted successfully");
});

// users
app.get("/users", (req, res) => {
  res.status(200).send(er.users);
});

app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  res.status(200).send(er.getUserById(id));
});

app.post("/users", (req, res) => {
  const { id, name } = req.body;
  er.addUser(id, name);
  res.status(200).send("User added successfully");
});

app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  er.deleteUser(id);
  res.status(200).send("Event deleted successfully");
});

//find events by date
app.get("/events/date/:date", (req, res) => {
  let date = req.params.date;
  let events = er.findEventsByDate(date);
  res.status(200).send(events);
});

//find events by category
app.get("/events/category/:category", (req, res) => {
  let category = req.params.category;
  let events = er.findEventsByCategory(category);
  res.status(200).send(events);
});

//save event for user
app.post("/user/events", (req, res) => {
  const { userId, eventId } = req.body;
  er.saveUserEvent(userId, eventId);
  res.status(200).send("Saved");
});

app.get("/", (req, res) => res.status(200).send("Hello People!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
