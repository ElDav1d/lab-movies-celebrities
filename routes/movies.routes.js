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

router.get("/:movieId", async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const response = await Movie.findById(movieId).populate("cast");

    res.render("movies/movie-details.hbs", {
      detalles: response,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:movieId/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/:movieId/edit", async (req, res, next) => {
  try {
    const response = await Movie.findById(req.params.movieId).populate(
      "cast",
      "name"
    );

    res.render("movies/edit-movie.hbs", response);
  } catch (error) {
    next(error);
  }
});

router.post("/:movieId/edit" , async (req, res, next)=>{

  const {movieId} = req.params
  const {title,genre,plot,cast} = req.body
  // console.log(req.body.cast)
  try {

    await Movie.findByIdAndUpdate(movieId , {title,genre,plot,cast})
    // .populate("cast" , "name")


    res.redirect(`/movies/${movieId}`)
    
  } catch (error) {
    next(error)
  }


})

module.exports = router;
