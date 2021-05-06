const express = require('express');

const {
  models: { Review },
} = require('../db/models/associations');

const reviewRouter = express.Router();

reviewRouter.get('/:reviewId', async (req, res, next) => {
  // get a product review by id
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    if (!review) res.sendStatus(404);

    res.status(200).send(review);
  } catch (ex) {
    next(ex);
  }
});

reviewRouter.post('/', async (req, res, next) => {
  // create new review
  try {
    const {
      productId, userId, stars, body,
    } = req.body;
    const review = await Review.create({
      productId,
      userId,
      stars,
      body,
    });
    if (!review) res.sendStatus(404);
    res.status(200).send(review);
  } catch (ex) {
    next(ex);
  }
});

reviewRouter.put('/:reviewId', async (req, res, next) => {
  // update a product review by id
  if (!req.body) res.sendStatus(400);

  try {
    const { reviewId } = req.params;
    const { stars, body } = req.body;
    let review = await Review.findByPk(reviewId);
    review = await review.update({
      body,
      stars,
    });
    res.status(200).send(review);
  } catch (ex) {
    next(ex);
  }
});

reviewRouter.delete('/:reviewId', async (req, res, next) => {
  // delete a product review by id
  try {
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId);
    await review.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = reviewRouter;
