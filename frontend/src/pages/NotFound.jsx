import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export default function NotFound() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%)" }}>
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 100, color: "#d81b60" }} />
      <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button href="/" variant="contained" sx={{ mt: 3, background: "linear-gradient(90deg, #1976d2 0%, #d81b60 100%)", color: "#fff", fontWeight: "bold" }}>
        Go to Dashboard
      </Button>
    </Box>
  );
} 