const express = require("express");
const router = express.Router();

const genreFinder = require("./genreFinder");

router.get("/:genre", (req, res) => {
  const foundGenre = genreFinder(req.params.genre);
  res.json(foundGenre);
});

module.exports = router;
