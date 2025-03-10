const reviewService = require("../services/review.service.js");

const createReview = async (req, res) => {
  const user = req.user;
  const { productId, review, title, rating } = req.body;
  if (!productId || !review || !title) {
    return res
      .status(400)
      .send({ error: "Product ID, review, and title are required" });
  }
  try {
    // const review = await reviewService.createReview(req.body, user);
    const createdReview = await reviewService.createReview(
      { productId, review, title, rating },
      user
    );
    console.log("Review Created:", createdReview);
    return res.status(200).send(createdReview);
  } catch (error) {
    console.error("Error creating review:", error);
    return res.status(500).send({ error: error.message });
  }
};
const getAllReview = async (req, res) => {
  // const productId = req.params.productId;
  const { productId } = req.params;
  try {
    const reviews = await reviewService.getAllReview(productId);
    return res.status(200).send(reviews);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { createReview, getAllReview };
