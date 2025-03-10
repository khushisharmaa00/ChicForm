import { Button, Rating, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../../config/apiConfig";

const ReviewRatingForm = ({ productId, user }) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewResponse = await api.post("/api/reviews/create", {
        productId,
        review: reviewText,
      });
      const ratingResponse = await api.post("/api/ratings/create", {
        productId,
        rating,
      });
      console.log("Rating Response:", ratingResponse.data);

      if (reviewResponse.status === 200 && ratingResponse.status === 200) {
        alert("Review and rating submitted successfully!");
        setReviewText("");
        setRating(0);
        window.location.reload();
      } else {
        throw new Error("Failed to submit review or rating");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Rating
          name="rating"
          value={rating}
          onChange={(e, newValue) => setRating(newValue)}
          precision={1}
          required
        />
      </div>
      <TextField
        label="Write your review"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewRatingForm;
