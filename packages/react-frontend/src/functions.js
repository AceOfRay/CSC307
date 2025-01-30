
function fetchUsers() {
  const promise = fetch("http://localhost:8000/users");
  return promise;
}

function postUser(person) {
  const promise = fetch("Http://localhost:8000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(person)
  });

  return promise;
}

function deleteUser(id) {
  const promise = fetch(`http://localhost:8000/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type" : "application/json"
    },
  })
  return promise;
}

export { fetchUsers, postUser, deleteUser };

