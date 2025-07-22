import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";

export default function PlaylistDetail() {
  return (
    <Box>
      <Paper elevation={6} sx={{ p: 3, mb: 4, background: "#232323", color: "#fff" }}>
        <Typography variant="h5" fontWeight="bold">Playlist Title (Placeholder)</Typography>
        <Typography color="#aaa">Playlist description goes here.</Typography>
      </Paper>
      <Typography variant="h6" color="#fff" sx={{ mb: 2 }}>Videos in this playlist</Typography>
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