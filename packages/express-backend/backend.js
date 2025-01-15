import express from "express";
import { users } from "./data.js";
  

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (request, response) => {
    response.send(users);
})

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});