const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  review: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: { type: Number, required: true, min: 1, max: 5 },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Review = mongoose.model("reviews", reviewSchema);
module.exports = Review;
