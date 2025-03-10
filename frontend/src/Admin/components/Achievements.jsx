import { Button, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";

const TriangleImg = styled("img")({
  right: "0",
  bottom: "0",
  position: "absolute",
  height: 170,
});

const TrophyImg = styled("img")({
  right: 36,
  bottom: 20,
  height: 98,
  position: "absolute",
});
const Achievements = () => {
  return (
    <Card
      className=""
      sx={{
        position: "relative",
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "#ffffff",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardContent>
        <Typography
          variant="h-6"
          sx={{ letterSpacing: ".25px", fontWeight: "bold", color: "white" }}
        >
          Shop With ChicForm
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          {" "}
          Congratulations 🥳
        </Typography>
        <Typography
          variant="h5"
          sx={{ my: 3.1, color: "white", fontWeight: "bold" }}
        >
          420.8k
        </Typography>
        <Button
          size="small"
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            "&:hover": { backgroundColor: "#1565c0" },
          }}
        >
          View Sales
        </Button>
        <TriangleImg src=""></TriangleImg>
        <TrophyImg src="https://w7.pngwing.com/pngs/571/421/png-transparent-trophy-trophy-image-file-formats-trophy-objects-thumbnail.png" />
      </CardContent>
    </Card>
  );
};

export default Achievements;
