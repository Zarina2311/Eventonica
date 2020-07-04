import React, { useState, useEffect } from "react";
import AddUserForm from "./components/AddUserForm";
import DeleteUserForm from "./components/DeleteUserForm";
import AddEventForm from "./components/AddEventForm";
import DeleteEventForm from "./components/DeleteEventForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });

    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(data => {
        setEvents(data);
      });
  }, []);

  return (
    <div className="App">
      <h1>Event Recommender</h1>

      <h2>User Management</h2>
      <h4>All Users</h4>
      {users.map(function(user) {
        return (
          <div key={user.id}>
            {user.id} {user.name}
          </div>
        );
      })}
      <AddUserForm />
      <DeleteUserForm />

      <h2>Event Management</h2>
      <h4>All Events</h4>
      {events.map(function(event) {
        return (
          <div key={event.id}>
            {event.id} {event.name}
          </div>
        );
      })}
      <AddEventForm />
      <DeleteEventForm />
    </div>
  );
}

export default App;
