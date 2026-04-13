// Import the Express framework - it helps us create a web server easily
const express = require("express");

// Import our database file (db.json) - this is where all our pet data lives
// In a real app, you'd use a real database like MongoDB or PostgreSQL
const database = require("./db.json");

// Create an Express application - think of this as our server object
// We use this 'app' to define routes (URLs) and start the server
const app = express();

// ============================================================
// ROUTES - These define what happens when someone visits a URL
// ============================================================

// GET All Pets
// When someone visits http://localhost:8081/ this code runs
// req = the incoming request (info about what the client sent)
// res = the response object (we use it to send data back to the client)
app.get("/", (req, res) => {
  // res.send() sends the entire database back to the client as JSON
  res.send(database);
});

// GET Pet By ID
// The ":id" is a route parameter - it's a placeholder for any value
// Example: http://localhost:8081/5 → id will be "5"
app.get("/:id", (req, res) => {
  console.log(req);

  // req.params.id grabs the value from the URL (e.g., "5")
  // Note: it comes as a string, so we need to convert it to a number later
  const id = req.params.id;

  // .find() searches through the pets array and returns the FIRST match
  // We use Number(id) because req.params.id is a string, but pet.id is a number
  // Without Number(), "5" === 5 would be false (strict equality)
  const pet = database.pets.find((pet) => pet.id === Number(id));

  // Send the found pet back to the client
  // If no pet is found, this will send 'undefined'
  res.send(pet);
});

// GET Pets By Species (cat or dog)
// Example: http://localhost:8081/species/cat → returns all cats
// Example: http://localhost:8081/species/dog → returns all dogs
app.get("/species/:species", (req, res) => {
  const species = req.params.species;

  // .filter() is like .find(), but it returns ALL matches (as an array)
  // instead of just the first one
  const pets = database.pets.filter((pet) => pet.species === species);

  res.send(pets);
});

// SEARCH Pets by Name using Query Parameters
// Query parameters come after a "?" in the URL
// Example: http://localhost:8081/search?name=tom
// req.query.name will be "tom"
app.get("/search", (req, res) => {
  // Get the "name" query parameter from the URL
  const name = req.query.name;

  // Filter pets whose name contains the search term (case-insensitive)
  // .toLowerCase() converts both strings to lowercase so "Tom" matches "tom"
  // .includes() checks if one string contains another
  const pets = database.pets.filter((pet) =>
    pet.name.toLowerCase().includes(name.toLowerCase())
  );

  res.send(pets);
});

// ============================================================
// START THE SERVER
// ============================================================

// app.listen() starts the server on port 8081
// A port is like a door number - your computer has many ports,
// and this server will listen on door 8081 for incoming requests
// The callback function runs once the server is ready
app.listen(8081, () => {
  console.log("Server is running on http://localhost:8081");
});
