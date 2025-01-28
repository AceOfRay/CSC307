import { users } from "./data.js";

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  user = { id : generateId(), ...user};
  users["users_list"].push(user);
  console.log(user);
  console.log(users);
  return user;
};

const deleteUserById = (id) => {
  return users["users_list"].filter(user => user["id"] !== id);
}

const findMatchingUsers = (job, name) => {
  return users.users_list.filter((user) => user.name === name && user.job === job);
}

const generateId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export { findUserById, findUserByName, addUser, deleteUserById, findMatchingUsers, generateId };
