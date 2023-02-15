const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const response = await Celebrity.find();

    res.render("celebrities/celebrities.hbs", {
      allCelebrities: response,
    });
  } catch (error) {
    next(error);
  }
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
    next(error);
  }
});

router.get("/:celebId", async (req, res, next) => {
  try {
    const celebDetails = await Celebrity.findById(req.params.celebId);

    res.render("celebrities/celebrity-details.hbs", celebDetails);
  } catch (error) {
    next(error);
  }
});

router.get("/:celebId/edit", async (req, res, next) => {
  try {
    const celebDetails = await Celebrity.findById(req.params.celebId);

    res.render("celebrities/edit-celebrity.hbs", celebDetails);
  } catch (error) {
    next(error);
  }
});

router.post("/:celebId/edit", async (req, res, next) => {
  const { celebId } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.findByIdAndUpdate(celebId, {
      name,
      occupation,
      catchPhrase,
    });

    res.redirect(`/celebrities/${celebId}`);
  } catch (error) {
    next(error);
  }
});

router.post("/:celebId/delete", async (req, res, next) => {
  try {
    await Celebrity.findByIdAndDelete(req.params.celebId);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
