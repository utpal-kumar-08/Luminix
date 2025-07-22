import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Grid } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

export default function VideoUpload() {
  const [form, setForm] = useState({ title: "", description: "", duration: "" });
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const theme = useTheme();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleVideo = (e) => setVideo(e.target.files[0]);
  const handleThumb = (e) => setThumbnail(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (video) data.append("video", video);
    if (thumbnail) data.append("thumbnail", thumbnail);
    try {
      await axios.post("http://localhost:8000/videos", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setSuccess("Video uploaded successfully!");
      setForm({ title: "", description: "", duration: "" });
      setVideo(null);
      setThumbnail(null);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: theme.palette.mode === "dark" ? "#181818" : "#f3f6f9" }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, background: theme.palette.mode === "dark" ? "#232323" : "#fff" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 2, color: theme.palette.text.primary }}>
              Upload Video
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                    InputProps={{ style: { color: theme.palette.text.primary } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                    InputProps={{ style: { color: theme.palette.text.primary } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Duration (seconds)"
                    name="duration"
                    type="number"
                    value={form.duration}
                    onChange={handleChange}
                    color="primary"
                    variant="outlined"
                    InputLabelProps={{ style: { color: theme.palette.text.primary } }}
                    InputProps={{ style: { color: theme.palette.text.primary } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label" fullWidth sx={{ background: "#ff0000", color: "#fff", fontWeight: "bold" }}>
                    Upload Video File
                    <input type="file" accept="video/*" hidden onChange={handleVideo} />
                  </Button>
                  {video && <Typography variant="caption">{video.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label" fullWidth sx={{ background: "#ff0000", color: "#fff", fontWeight: "bold" }}>
                    Upload Thumbnail
                    <input type="file" accept="image/*" hidden onChange={handleThumb} />
                  </Button>
                  {thumbnail && <Typography variant="caption">{thumbnail.name}</Typography>}
                </Grid>
              </Grid>
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "linear-gradient(90deg, #1976d2 0%, #d81b60 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: 3,
                  "&:hover": {
                    background: "linear-gradient(90deg, #1565c0 0%, #ad1457 100%)",
                  },
                }}
              >
                Upload
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 