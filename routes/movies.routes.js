const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    console.log(movies);
    res.render("movies/movies.hbs", { movies });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const response = await Celebrity.find().select("name");

    res.render("movies/new-movie.hbs", { allCellebs: response });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    next(error);
    res.redirect("/movies/create");
  }
});

module.exports = router;
