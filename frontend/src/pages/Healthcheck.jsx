import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Healthcheck() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3, background: "#232323", color: "#fff", textAlign: "center" }}>
        <CheckCircleIcon sx={{ fontSize: 64, color: "#4caf50" }} />
        <Typography variant="h4" fontWeight="bold" sx={{ mt: 2 }}>Server Status</Typography>
        <Typography color="#aaa" sx={{ mt: 1 }}>All systems operational (placeholder)</Typography>
      </Paper>
    </Box>
  );
} 