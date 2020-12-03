const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.render("profile", {
    user: req.user.toObject(),
  });
});

router.post("/", (req, res) => {
  res.render("profile", {
    user: req.user.toObject(),
  });
});

module.exports = router;
