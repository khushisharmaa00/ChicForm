const Rating = require("../models/rating.model.js");
const productService = require("../services/product.service.js");

async function createRating(req, user) {
  console.log("Creating rating for product:", req.productId);
  console.log("User:", user._id);
  console.log("Rating value:", req.rating);
  const product = await productService.findProductById(req.productId);
  const rating = new Rating({
    product: product._id,
    user: user._id,
    rating: req.rating,
    createdAt: new Date(),
  });
  await rating.save();
  console.log("Rating saved:", rating);
  // Add the rating to the product's ratings array
  product.ratings.push(rating._id);
  await product.save();

  return rating;

  // return await rating.save();
}

async function getAllRating(productId) {
  // return await Rating.find({ product: productId });
  console.log("Fetching ratings for product ID:", productId);
  return await Rating.find({ product: productId }).populate("user");
}

module.exports = { createRating, getAllRating };
