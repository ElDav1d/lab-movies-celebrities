const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities.hbs");
});

router.get("/create", async (req, res, next) => {
  try {
    res.render("celebrities/new-celebrity.hbs");
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    const response = await Celebrity.create({ name, occupation, catchPhrase });

    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
