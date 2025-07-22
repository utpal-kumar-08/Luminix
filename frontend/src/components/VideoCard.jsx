import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActionArea, Avatar, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function VideoCard({ video }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 6, background: "rgba(255,255,255,0.95)" }}>
      <CardActionArea component={RouterLink} to={`/videos/${video._id}`}>
        <CardMedia
          component="img"
          height="180"
          image={video.thumbnail}
          alt={video.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
            {video.title}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={video.owner?.avatar} sx={{ width: 24, height: 24 }} />
            <Typography variant="body2" color="textSecondary">
              {video.owner?.username || "Unknown"}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
} 