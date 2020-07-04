import React from "react";

function DeleteUserForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const id = event.target.id.value;

    fetch("http://localhost:3000/users/" + id, {
      headers: {
        Accept: "application/json"
      },
      method: "DELETE"
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <h4>Delete User</h4>
      <label>User ID:</label>
      <input type="text" name="id" />
      <br />
      <input type="submit" />
    </form>
  );
}

export default DeleteUserForm;
