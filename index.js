const express = require("express");
const database = require("./db.json");

const app = express();

// Get All Pets
app.get("/", (req, res) => {
  res.send(database);
});

// Get Pet By ID
app.get("/:id", (req, res) => {
  console.log(req);
  const id = req.params.id;
  const pet = database.pets.find((pet) => pet.id === Number(id));
  res.send(pet);
});

// Get Pet By Species
app.get("/species/:species", (req, res) => {
  const species = req.params.species;
  const pets = database.pets.filter((pet) => pet.species === species);
  res.send(pets);
});
// Search Pets by Name
app.get("/search", (req, res) => {
  const name = req.query.name;
  const pets = database.pets.filter((pet) =>
    pet.name.toLowerCase().includes(name.toLowerCase())
  );
  res.send(pets);
});

app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
