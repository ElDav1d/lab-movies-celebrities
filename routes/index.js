const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebRoutes = require("./celebrities.routes");
router.use("/celebrities", celebRoutes);

module.exports = router;
