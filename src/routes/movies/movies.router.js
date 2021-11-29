const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../../errors/methodNotAllowed")
const cors = require("cors");

router
    .route('/')
    .get(cors(), controller.fetch)
    .all(methodNotAllowed)

router
  .route('/:movieId/theaters')
  .get(controller.readTheaters)
  .all(methodNotAllowed)

router
  .route('/:movieId/reviews')
  .get(controller.readReviews)
  .all(methodNotAllowed)
git a
router
    .route('/:movieId')
    .get(controller.read)
    .all(methodNotAllowed)

module.exports = router;