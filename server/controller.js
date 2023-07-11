const movieDatabase = require("./db.json"); //separate the database into another file to make it clean
let currentId = 11;

module.exports = {
  getMovies: (req, res) => {
    res.status(200).send(movieDatabase);
  },
  addMovie: (req, res) => {
    const { title, rating, imageURL } = req.body;
    movieDatabase.push({
      id: currentId,
      title: title,
      rating: rating,
      imageURL: imageURL,
    });
    currentId++;

    res.status(200).send(movieDatabase);
  },

  deleteMovie: (req, res) => {
    const id = +req.params.id; //+ sign converts string to number

    let movieIndex;
    for (let i = 0; i < movieDatabase.length; i++) {
      if (movieDatabase[i].id === id) {
        movieDatabase.splice(i, 1);
        res.status(200).send(movieDatabase);
        return;
      }
    }
    res.status(400).send("movie not found");
  },
  updateMovie: (req, res) => {
    const id = +req.params.id;
    const type = req.body.type;

    let movieIndex;
    for (let i = 0; i < movieDatabase.length; i++) {
      if (movieDatabase[i].id === id) {
        movieIndex = i;
      }
    }
    if (movieIndex === undefined) {
      res.status(400).send("movie not found");
    } else if (type === "plus") {
      if (movieDatabase[movieIndex].rating < 5) {
        movieDatabase[movieIndex].rating++;
      }
      res.status(200).send(movieDatabase);
    } else if (type === "minus") {
      if (movieDatabase[movieIndex].rating > 1) {
        movieDatabase[movieIndex].rating--;
      }
      res.status(200).send(movieDatabase);
    } else {
      res.status(400).send("invalid type constraint");
    }
  },
};
