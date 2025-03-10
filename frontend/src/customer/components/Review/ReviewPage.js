import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star"; // Filled star
import StarBorderIcon from "@mui/icons-material/StarBorder"; // Empty star
import { api } from "../../../config/apiConfig";

const ReviewPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    rating: 0,
    title: "",
    description: "",
  });

  const handleRatingClick = (rating) => {
    setReview({ ...review, rating });
  };

  const handleSubmitReview = async () => {
    console.log("Submitting review with data:", {
      productId,
      review: review.description,
      title: review.title,
      rating: review.rating,
    });

    try {
      const response = await api.post("/api/reviews/create", {
        productId,
        review: review.description,
        title: review.title,
        rating: review.rating,
      });
      if (response.status === 200) {
        alert("Review Submitted Successfully!");
        navigate(-1); // Navigate back
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <Box className="p-10">
      <Typography variant="h5" fontWeight="bold">
        Rate & Review Product
      </Typography>
      {/* Star Rating System */}
      <Box className="flex mt-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            sx={{ cursor: "pointer", display: "inline-block" }}
            onClick={() => handleRatingClick(star)}
          >
            {star <= review.rating ? (
              <StarIcon sx={{ fontSize: "2rem", color: "gold" }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: "2rem", color: "gold" }} />
            )}
          </Box>
        ))}
      </Box>

      <TextField
        fullWidth
        label="Title"
        className="mt-4"
        onChange={(e) => setReview({ ...review, title: e.target.value })}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={4}
        className="mt-4"
        onChange={(e) => setReview({ ...review, description: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        className="mt-5"
        onClick={handleSubmitReview}
      >
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewPage;
