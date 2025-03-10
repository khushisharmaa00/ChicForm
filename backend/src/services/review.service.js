const Review = require("../models/review.model.js");
const productService = require("../services/product.service.js");

async function createReview(reqData, user) {
  const { productId, review, title, rating } = reqData;

  const product = await productService.findProductById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  const newReview = new Review({
    user: user._id,
    product: product._id,
    review: review,
    title: title,
    rating,
    createdAt: new Date(),
  });
  // await product.save();
  // Save the review
  await newReview.save();

  // Add the review to the product's reviews array
  product.reviews.push(newReview._id);
  await product.save();

  return newReview;
  // return await review.save();
}

async function getAllReview(productId) {
  // const product = await productService.findProductById(reqData.productId);
  return await Review.find({ product: productId }).populate("user");
}

module.exports = {
  createReview,
  getAllReview,
};
