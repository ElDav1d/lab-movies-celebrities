const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("celebrities/celebrities.hbs");
});

module.exports = router;
