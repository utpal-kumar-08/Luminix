import React from "react";
import { Box, Typography, Paper, Avatar, Button, Grid, Divider } from "@mui/material";

export default function VideoDetail() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={8}>
        <Paper elevation={6} sx={{ p: 2, mb: 2, background: "#232323" }}>
          <Box sx={{ position: "relative", pb: "56.25%", height: 0, mb: 2 }}>
            <Box component="video" controls src="" sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#000" }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" color="#fff">Video Title (Placeholder)</Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 1 }}>
            <Avatar sx={{ mr: 2 }} />
            <Typography color="#fff">Channel Name</Typography>
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>Subscribe</Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button variant="outlined" color="secondary" sx={{ mr: 1 }}>Like</Button>
            <Button variant="outlined" color="secondary">Dislike</Button>
          </Box>
          <Typography color="#aaa" variant="body2">1,234,567 views • 1 day ago</Typography>
          <Divider sx={{ my: 2, background: "#333" }} />
          <Typography color="#fff" sx={{ mb: 2 }}>Video description goes here. (Placeholder)</Typography>
          <Typography color="#fff" fontWeight="bold" sx={{ mb: 1 }}>Comments</Typography>
          <Paper sx={{ p: 2, background: "#181818" }}>
            <Typography color="#aaa">Comments section (placeholder)</Typography>
          </Paper>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography color="#fff" fontWeight="bold" sx={{ mb: 2 }}>Related Videos</Typography>
        <Paper sx={{ p: 2, background: "#232323" }}>
          <Typography color="#aaa">Related videos (placeholder)</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
} 