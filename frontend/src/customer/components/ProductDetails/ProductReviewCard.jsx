import { Avatar, Grid, Rating, Box } from "@mui/material";
import React from "react";

const ProductReviewCard = ({ review }) => {
  console.log("Review Data:", review);
  const userFirstName = review.user?.firstName || "User";
  const reviewDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString()
    : "No date";
  // const reviewRating = Math.round(review.rating) || 0;
  const reviewRating = review.rating || 0;
  const reviewText = review.review || "No review text available.";
  return (
    <div>
      <Grid container spacing={2} gap={3}>
        <Grid item xs={1}>
          <Box>
            <Avatar
              className="text-white"
              sx={{ width: 56, height: 56, bgcolor: "#9155fd" }}
            >
              {/* K */}
              {userFirstName.charAt(0)}
            </Avatar>
          </Box>
        </Grid>

        <Grid item xs={9}>
          <div className="space-y-2">
            <div>
              <p className="font-semibold text-lg">{userFirstName}</p>
              <p className="opacity-70">
                {/* May 16, 2025 */}
                {reviewDate}
              </p>
            </div>
          </div>
          <Rating
            // value={4.5}
            value={reviewRating}
            name="read-only"
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: "#ffeb3b", // Yellow color for filled stars
              },
              "& .MuiRating-iconEmpty": {
                color: "#e0e0e0",
              },
            }}
          />

          <p>
            {/* My order arrived on time, well-packaged, and exactly as described.
            The quality of the product was good. */}
            {reviewText}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductReviewCard;
