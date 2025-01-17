import { users } from "./data.js";

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
  return users["users_list"].filter(user => user["id"] !== id);
}

const findMatchingUsers = (job, name) => {
  return users.users_list.filter((user) => user.name === name && user.job === job);
}

export { findUserById, findUserByName, addUser, deleteUserById, findMatchingUsers };
