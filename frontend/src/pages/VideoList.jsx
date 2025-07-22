import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import VideoCard from "../components/VideoCard";
import axios from "axios";

export default function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/videos")
      .then(res => setVideos(res.data.data.docs || []))
      .catch(() => setVideos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={4} color="primary">
        All Videos
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {videos.length === 0 && <Typography>No videos found.</Typography>}
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video._id}>
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 