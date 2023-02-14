const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");

router.get("/", async (req, res, next) => {
  try {
    const response = await Movie.find();
    res.render("movies/movies.hbs", { allMovies: response });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const responseCeleb = await Celebrity.find().select({ name: 1 });

    res.render("movies/new-movie.hbs", {
      nameCelebrity: responseCeleb,
    });
  } catch (error) {
    next(error);
  }

  res.render("movies/new-movie.hbs");
});

router.post("/create", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;

    await Movie.create({ title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
