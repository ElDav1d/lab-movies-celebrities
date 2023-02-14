const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebrityRoutes = require("./celebrities.routes");
router.use("/celebrities", celebrityRoutes);


const movieRoute = require("./movies.routes");
router.use("/movies", movieRoute);

module.exports = router;
