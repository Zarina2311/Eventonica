import React from "react";

function DeleteEventForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const id = event.target.id.value;

    fetch("http://localhost:3000/events/" + id, {
      headers: {
        Accept: "application/json"
      },
      method: "DELETE"
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4>Delete Event</h4>
      <label>Event ID:</label>
      <input type="text" name="id" />
      <br />
      <input type="submit" />
      <br />
      <br />
    </form>
  );
}

export default DeleteEventForm;
