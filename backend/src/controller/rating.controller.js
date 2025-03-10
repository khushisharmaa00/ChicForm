const ratingService = require("../services/rating.service.js");
const createRating = async (req, res) => {
  const user = req.user;
  const { productId, rating } = req.body;

  if (!productId || !rating) {
    return res
      .status(400)
      .send({ error: "Product ID and rating are required" });
  }
  try {
    // const rating = await ratingService.createRating(req.body, user);
    const createdRating = await ratingService.createRating(
      { productId, rating },
      user
    );
    return res.status(200).send(createdRating);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const getAllRating = async (req, res) => {
  const productId = req.params.productId;

  try {
    const ratings = await ratingService.getAllRating(productId);
    return res.status(200).send(ratings);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createRating, getAllRating };
