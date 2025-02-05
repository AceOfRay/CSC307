import express from "express";
import UserService from "./services/user-service.js";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGO_CONNECTION_STRING } = process.env;

console.log(MONGO_CONNECTION_STRING);
mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());



app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  UserService.getUsers(name, job).then((promise) => 
    res.send({users_list: promise})
  ).catch( (error) =>
    console.log(error)
  );
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  UserService.findUserById(id)
    .then((result) => {
      if (result) {
        res.send(result);
      } else {
        res.status(404).send(`Not Found: ${id}`);
      }
    })
    .catch((error) => {
      res.status(500).send(error.name);
    })
})

// app.get("/users/:job/:name", (req, res) => {
//   const job = req.params.job;
//   const name = req.params.name;

//   findMatchingUsers(job, name).then((promise) => {
//     if (promise === undefined) {
//       res.status(500).send("Internal Server Error");
//   } else {
//       res.send(promise);
//   }
//   })
// })

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  UserService
    .addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => res.status(500).send(error));
});


app.delete("/users/:id", (req, res) => {
  UserService.deleteUserById(req.params.id).then((promise) => {
    if (promise === undefined) {
      res.status(404).send("Resource Not Found")
    } else {
      res.status(204).send();
    }
  })

})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});