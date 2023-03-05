const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities.hbs");
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    await Celebrity.create({ name, occupation, catchPhrase });

    res.redirect("/celebrities");
  } catch (error) {
    res.redirect("celebrities/create");
    next(error);
  }
});

module.exports = router;
