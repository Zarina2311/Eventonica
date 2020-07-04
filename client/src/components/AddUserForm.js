import React from "react";

function AddUserForm() {
  function handleSubmit(event) {
    event.preventDefault();

    const newUser = new URLSearchParams({
      name: event.target.name.value,
    });

    fetch("http://localhost:3000/users", {
      headers: {
        Accept: "application/json",
      },
      body: newUser,
      method: "POST",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Add User</h4>
      <label className="input-label">User name</label>
      <br />
      <input type="text" name="name" />
      <br />
      <input type="submit" />
    </form>
  );
}

export default AddUserForm;
