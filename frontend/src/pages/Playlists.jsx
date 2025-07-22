import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

export default function Playlists() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#fff" sx={{ flexGrow: 1 }}>
          Playlists
        </Typography>
        <Button variant="contained" color="primary" startIcon={<PlaylistPlayIcon />}>Create Playlist</Button>
      </Box>
      <Grid container spacing={4}>
        {[1,2,3].map((id) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, background: "#232323", color: "#fff" }}>
              <Typography variant="h6">Playlist {id} (Placeholder)</Typography>
              <Typography color="#aaa">Playlist description...</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 