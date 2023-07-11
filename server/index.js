const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getMovies, addMovie, deleteMovie } = require("./controller.js");

app.get("/api/movies", getMovies);

app.post("/api/movies", addMovie);

app.delete("/api/movies/:id", deleteMovie);

app.listen(4004, () => {
  console.log("up on 4004");
});
