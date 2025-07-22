import React from "react";
import { Container, Box, Typography, Grid, Paper } from "@mui/material";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)", py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" fontWeight="bold" textAlign="center" mb={4} color="primary">
          Welcome to Chai Aur Major Project!
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(255,255,255,0.9)" }}>
              <VideoLibraryIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h6" mt={2}>Videos</Typography>
              <Typography variant="h4" fontWeight="bold">--</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(255,255,255,0.9)" }}>
              <PlaylistPlayIcon color="secondary" sx={{ fontSize: 48 }} />
              <Typography variant="h6" mt={2}>Playlists</Typography>
              <Typography variant="h4" fontWeight="bold">--</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(255,255,255,0.9)" }}>
              <ChatIcon color="primary" sx={{ fontSize: 48 }} />
              <Typography variant="h6" mt={2}>Tweets</Typography>
              <Typography variant="h4" fontWeight="bold">--</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "rgba(255,255,255,0.9)" }}>
              <FavoriteIcon color="secondary" sx={{ fontSize: 48 }} />
              <Typography variant="h6" mt={2}>Likes</Typography>
              <Typography variant="h4" fontWeight="bold">--</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 