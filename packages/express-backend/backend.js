import express from "express";
import { users } from "./data.js";
import { findUserByName, findUserById, addUser, deleteUserById, findMatchingUsers} from "./functions.js";
import cors from "cors";
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json()); 

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.get("/users/:job/:name", (req, res) => {
  const job = req.params.job;
  const name = req.params.name;

  let matchingPeople = findMatchingUsers(job, name);
  if (matchingPeople === undefined) {
    res.status(500).send("Internal Server Error");
  } else {
    res.send(matchingPeople);
  }
})

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send();
});

app.delete("/users/:id", (req, res) => {
  const idToDelete = req.params["id"];
  const newList = deleteUserById(idToDelete)
  if (newList === undefined) {
    res.status(500).send("Internal Server Error")
  } else {
    const result = { users_list: newList };
    res.send(result);
  }
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});