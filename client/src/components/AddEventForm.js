import React from "react";

function AddEventForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const newEvent = new URLSearchParams({
      name: event.target.name.value, // "value" is user's input
      date: event.target.date.value,
      category: event.target.category.value,
    });

    fetch("http://localhost:3000/events", {
      headers: {
        Accept: "application/json",
      },
      body: newEvent,
      method: "POST",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add Event</h4>
      <label className="input-label">Event name</label>
      <input type="text" name="name" />
      <label className="input-label">Event date</label>
      <input type="text" name="date" />
      <label className="input-label">Event category</label>
      <input type="text" name="category" />
      <input type="submit" />
    </form>
  );
}

export default AddEventForm;
