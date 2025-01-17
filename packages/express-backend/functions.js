import { users } from "./data.js";

export const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

export const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
