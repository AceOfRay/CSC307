// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";
import { fetchUsers, postUser, deleteUser } from "./functions";

export default function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id) {
    const updated = deleteUser(id);
    updated.then((promise) => {
      if (promise.status === 204) {
        console.log("User Successfully Deleted");
        const updated = characters.filter((character) => {
          return character.id !== id;
        });
        setCharacters(updated);
      } else if (promise.status === 404) {
        console.log("User Not Found");
      }
    })
    
  }

  function updateList(person) {
    postUser(person)
      .then((promise) => {
        if (promise.status === 201) {
          return promise.json();
        } else {
          console.log(`Status Code ${promise.status} | User not created`)
        }
      })
      .then((json) => {
        setCharacters([...characters, json])
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        setCharacters(json["users_list"]);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
