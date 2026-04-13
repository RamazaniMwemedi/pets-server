# Pets Server

A simple REST API built with **Node.js** and **Express** for learning purposes. It serves pet data (cats and dogs) from a JSON file. This project is designed to help beginners understand how backend servers work.

---

## What Does This Project Do?

Imagine you have a list of pets stored in a file. This project creates a **web server** — a program that listens for requests from a browser or app and sends back data. When you visit a URL like `http://localhost:8081/`, the server reads the pet data and sends it to you.

This is how most websites and mobile apps work behind the scenes: a frontend (what you see) talks to a backend server (this project) to get data.

---

## Prerequisites

Before you start, make sure you have these installed on your computer:

- **Node.js** (v14 or higher) — [Download here](https://nodejs.org)
- **npm** (comes with Node.js) — this is a package manager that installs libraries for you

To check if you have them installed, open your terminal and run:

```bash
node -v
npm -v
```

If you see version numbers (like `v18.17.0` and `9.6.7`), you're good to go. If you get an error, you need to install Node.js first.

---

## Getting Started

### 1. Clone or Download the Project

If you received this as a ZIP file, extract it. If you're using Git:

```bash
git clone https://github.com/RamazaniMwemedi/pets-server
cd pets-server
```

### 2. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

**What does this do?** It reads the `package.json` file (a config file that lists what libraries the project needs) and downloads them into a folder called `node_modules`. In this case, it downloads **Express**.

> You only need to run `npm install` once. After that, the libraries are saved in `node_modules`.

### 3. Start the Server

```bash
node index.js
```

You should see:

```
Server is running on http://localhost:8081
```

**What does this mean?** Your server is now running on your computer. `localhost` means "this computer" and `8081` is the **port** (think of it like a door number — your computer has thousands of ports, and the server is listening on door 8081).

### 4. Test the API

Open your browser and go to `http://localhost:8081/`. You should see all the pet data displayed as JSON.

You can also use tools like:

- **Postman** — a popular app for testing APIs (download from [postman.com](https://www.postman.com))
- **Thunder Client** — a VS Code extension (search for it in VS Code Extensions)
- **curl** — a command-line tool (comes pre-installed on Mac/Linux)

### 5. Stop the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## API Endpoints

An **endpoint** is a specific URL that your server responds to. Each endpoint does something different. Here are all the endpoints in this project:

### 1. Get All Pets

```
GET http://localhost:8081/
```

Returns all 40 pets in the database as a JSON array.

**When to use:** When you want to display a list of all pets (e.g., on a homepage).

**Response example (shortened):**

```json
{
  "pets": [
    {
      "id": 1,
      "name": "Tom",
      "species": "cat",
      "breed": "Persian",
      "owner": "Ramazani",
      "age": 2,
      "weight": 5,
      "gender": "Male",
      "isAlive": true,
      "color": "white",
      "vaccinated": true,
      "microchipped": true,
      "adoptionDate": "2024-03-15",
      "healthStatus": "healthy",
      "rating": 4.5,
      "tags": ["indoor", "friendly"]
    }
  ]
}
```

---

### 2. Get Pet by ID

```
GET http://localhost:8081/:id
```

Replace `:id` with a number (1–40). Returns a single pet object.

**When to use:** When a user clicks on a pet and you want to show its details.

**Example:**

```
GET http://localhost:8081/5
```

**Response:**

```json
{
  "id": 5,
  "name": "Rex",
  "species": "dog",
  "breed": "German Shepherd",
  "owner": "David",
  "age": 6,
  "weight": 35,
  "gender": "Male",
  "isAlive": true,
  "color": "black and tan",
  "vaccinated": true,
  "microchipped": true,
  "adoptionDate": "2020-06-18",
  "healthStatus": "healthy",
  "rating": 4.7,
  "tags": ["outdoor", "guard", "trained"]
}
```

**What if the ID doesn't exist?** If you visit `/999`, the server sends back nothing (undefined), because no pet has that ID.

---

### 3. Get Pets by Species

```
GET http://localhost:8081/species/:species
```

Replace `:species` with `cat` or `dog`. Returns an array of all matching pets.

**When to use:** When you want to filter pets — for example, a "Show only cats" button.

**Examples:**

```
GET http://localhost:8081/species/cat    → Returns all 20 cats
GET http://localhost:8081/species/dog    → Returns all 20 dogs
```

---

### 4. Search Pets by Name

```
GET http://localhost:8081/search?name=:searchTerm
```

Replace `:searchTerm` with any text. The search is **case-insensitive** (so "tom" and "Tom" both work) and matches **partial names** (so "li" matches "Lily").

**When to use:** When you have a search bar and want to find pets by name.

**Examples:**

```
GET http://localhost:8081/search?name=tom       → Returns Tom
GET http://localhost:8081/search?name=buddy     → Returns Buddy
GET http://localhost:8081/search?name=li        → Returns Lily, Felix (partial match)
```

---

## Pet Data Structure

Each pet object has the following properties. Notice the **different data types** — this is great practice for learning how to work with various types of data:

| Property       | Type    | Description                                                              | Example                  |
| -------------- | ------- | ------------------------------------------------------------------------ | ------------------------ |
| `id`           | number  | Unique identifier for each pet                                           | `1`                      |
| `name`         | string  | Pet's name                                                               | `"Tom"`                  |
| `species`      | string  | Type of animal (`"cat"` or `"dog"`)                                      | `"cat"`                  |
| `breed`        | string  | Specific breed of the pet                                                | `"Persian"`              |
| `owner`        | string  | Name of the owner                                                        | `"Ramazani"`             |
| `age`          | number  | Age in years (whole number)                                              | `2`                      |
| `weight`       | number  | Weight in kg (can be a decimal)                                          | `4.2`                    |
| `gender`       | string  | `"Male"` or `"Female"`                                                   | `"Male"`                 |
| `isAlive`      | boolean | `true` or `false`                                                        | `true`                   |
| `color`        | string  | Fur/skin color                                                           | `"white"`                |
| `vaccinated`   | boolean | Has the pet been vaccinated?                                             | `true`                   |
| `microchipped` | boolean | Does the pet have a microchip?                                           | `false`                  |
| `adoptionDate` | string  | Date adopted in YYYY-MM-DD format                                        | `"2024-03-15"`           |
| `healthStatus` | string  | One of: `"healthy"`, `"sick"`, `"recovering"`, `"chronic"`, `"deceased"` | `"healthy"`              |
| `rating`       | number  | Rating from 0 to 5 (decimal)                                             | `4.5`                    |
| `tags`         | array   | List of descriptive labels                                               | `["indoor", "friendly"]` |

### Why Different Data Types Matter

When building a frontend, you'll handle each type differently:

- **Strings** → display as text
- **Numbers** → use for calculations, sorting, or displaying stats
- **Booleans** → use for toggle switches, checkboxes, or conditional rendering (e.g., show a "Vaccinated" badge if `vaccinated` is `true`)
- **Arrays** → loop through and display as tags/chips
- **Dates (as strings)** → format for display (e.g., "March 15, 2024")

---

## Project Structure

```
pets-server/
├── index.js          ← The main server file (all the routes live here)
├── db.json           ← The database file (all 40 pets stored as JSON)
├── package.json      ← Project config: name, version, and dependencies
├── package-lock.json ← Auto-generated: locks exact dependency versions
├── node_modules/     ← Auto-generated: contains downloaded libraries (Express)
└── README.md         ← This file
```

> **Note:** You should never edit `node_modules/` or `package-lock.json` manually. They are managed by npm.

---

## Key Concepts for Beginners

### What is Node.js?

Node.js lets you run JavaScript **outside** the browser. Normally, JavaScript only runs in web browsers (Chrome, Firefox, etc.). Node.js allows you to use JavaScript to build servers, command-line tools, and more.

### What is Express?

Express is a **framework** — a collection of pre-written code that makes common tasks easier. It sits on top of Node.js and simplifies creating web servers. Without Express, you'd need to write a lot more boilerplate code to handle HTTP requests.

### What is an API?

API stands for **Application Programming Interface**. It's a way for two programs to talk to each other. In this project, our server provides an API that a frontend app (or browser) can use to get pet data.

### What is REST?

REST (Representational State Transfer) is a set of rules for building APIs. The main idea is to use **HTTP methods** to perform actions:

| Method   | Action | Example                        |
| -------- | ------ | ------------------------------ |
| `GET`    | Read   | Get a list of pets             |
| `POST`   | Create | Add a new pet                  |
| `PUT`    | Update | Change a pet's name            |
| `DELETE` | Delete | Remove a pet from the database |

This server only uses **GET** (reading data). As you learn more, you'll add POST, PUT, and DELETE.

### What is a Route?

A route is a **URL pattern** that your server responds to. When someone visits a URL, Express checks which route matches and runs the corresponding code.

```javascript
app.get("/species/cat", ...)   // This route matches the URL /species/cat
app.get("/:id", ...)           // This route matches /1, /2, /anything
```

### Route Parameters vs Query Parameters

These are two ways to pass information through a URL:

**Route Parameters** — Part of the URL path, defined with `:` in the route:

```
URL:    http://localhost:8081/species/cat
Route:  /species/:species
Code:   req.params.species → "cat"
```

**Query Parameters** — Come after `?` in the URL, written as `key=value`:

```
URL:    http://localhost:8081/search?name=tom&species=cat
Code:   req.query.name → "tom"
        req.query.species → "cat"
```

**When to use which?**

- Use **route parameters** for required values that identify a resource (like an ID or category)
- Use **query parameters** for optional values like search terms, filters, or pagination

### What is JSON?

JSON (JavaScript Object Notation) is a format for storing and exchanging data. It looks like JavaScript objects but is just plain text. Our `db.json` file is a JSON file.

```json
{
  "name": "Tom",
  "age": 2,
  "isAlive": true
}
```

Almost every API in the world sends and receives data in JSON format.

### What is `req` and `res`?

Every route handler receives two objects:

- **`req` (request)** — Contains information about the incoming request: the URL, parameters, query strings, headers, etc.
- **`res` (response)** — Used to send data back to the client. `res.send()` sends the response.

```javascript
app.get("/", (req, res) => {
  // req = what the client sent to us
  // res = what we send back to the client
  res.send(database);
});
```

### JavaScript Array Methods Used

This project uses two important array methods:

- **`.find()`** — Returns the **first** item that matches a condition, or `undefined` if none match
- **`.filter()`** — Returns a **new array** with **all** items that match a condition

```javascript
// .find() returns ONE item
database.pets.find((pet) => pet.id === 5); // → { id: 5, name: "Rex", ... }

// .filter() returns an ARRAY of items
database.pets.filter((pet) => pet.species === "cat"); // → [{ ... }, { ... }, ...]
```

---

## Common Errors and Troubleshooting

| Error                                        | Cause                                                                            | Solution                                                              |
| -------------------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `Cannot find module 'express'`               | Dependencies not installed                                                       | Run `npm install`                                                     |
| `EADDRINUSE: address already in use :::8081` | Port 8081 is already taken (maybe another server is running)                     | Stop the other server, or change `8081` to another number like `3000` |
| `Cannot GET /search`                         | The `/search` route is defined after `/:id`, so Express thinks "search" is an ID | Move the `/search` route **above** the `/:id` route in `index.js`     |
| Browser shows nothing for a pet ID           | The ID doesn't exist in the database                                             | Use an ID between 1 and 40                                            |

---

## Next Steps

Once you're comfortable with this project, try these challenges:

1. **Add a new route** — Create `GET /owner/:owner` to find all pets by owner name
2. **Add POST** — Allow adding new pets using `app.post()` (you'll need `app.use(express.json())` to parse request bodies)
3. **Add DELETE** — Allow removing pets by ID using `app.delete()`
4. **Add PUT** — Allow updating pet data using `app.put()`
5. **Connect a real database** — Replace `db.json` with MongoDB or SQLite
6. **Build a frontend** — Create an HTML page that fetches data from this API using `fetch()`
