const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

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

router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId).populate(
      "cast",
      "name occupation catchPhrase"
    );

    res.render("movies/movie-details.hbs", movie);
  } catch (error) {
    next(error);
  }
});

router.get("/:movieId/delete", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    await Movie.findByIdAndDelete(movieId);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const movie = await Movie.findById(movieId);

    const celebResponse = await Celebrity.find().select("name");

    const allCelebs = celebResponse.map((celeb) => ({
      name: celeb.name,
      isSelected: movie.cast.includes(celeb._id),
    }));

    res.render("movies/edit-movie.hbs", { movie, allCelebs });
  } catch (error) {
    next(error);
  }
});

router.post("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    res.redirect("/movies/:movieId/edit");
    next(error);
  }
});

module.exports = router;
