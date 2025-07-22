import React from "react";
import { Box, Typography, Avatar, Paper, Grid, Button } from "@mui/material";

export default function Profile() {
  return (
    <Box>
      <Paper elevation={6} sx={{ p: 3, mb: 4, background: "linear-gradient(90deg, #232323 60%, #181818 100%)", color: "#fff", position: "relative" }}>
        <Box sx={{ height: 120, background: "#333", borderRadius: 2, mb: 2 }} />
        <Avatar sx={{ width: 80, height: 80, position: "absolute", top: 80, left: 32, border: "4px solid #fff" }} />
        <Box sx={{ ml: 16, mt: 2 }}>
          <Typography variant="h5" fontWeight="bold">Channel Name (Placeholder)</Typography>
          <Typography color="#aaa">123K subscribers • 42 videos</Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>Edit Profile</Button>
        </Box>
      </Paper>
      <Typography variant="h6" color="#fff" sx={{ mb: 2 }}>Your Videos</Typography>
      <Grid container spacing={4}>
        {[1,2,3].map((id) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Paper sx={{ p: 2, background: "#181818", color: "#fff" }}>
              <Typography>Video {id} (Placeholder)</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 