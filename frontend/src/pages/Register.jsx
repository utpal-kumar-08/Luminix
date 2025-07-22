import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Avatar, Grid } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleAvatar = (e) => setAvatar(e.target.files[0]);
  const handleCover = (e) => setCoverImage(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    if (avatar) data.append("avatar", avatar);
    if (coverImage) data.append("coverImage", coverImage);
    try {
      await axios.post("http://localhost:8000/users/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Registration successful! Please login.");
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #fce4ec 0%, #e3f2fd 100%)" }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, background: "rgba(255,255,255,0.85)" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <PersonAddAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Register
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} encType="multipart/form-data">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload Avatar
                    <input type="file" accept="image/*" hidden onChange={handleAvatar} />
                  </Button>
                  {avatar && <Typography variant="caption">{avatar.name}</Typography>}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label" fullWidth>
                    Upload Cover Image
                    <input type="file" accept="image/*" hidden onChange={handleCover} />
                  </Button>
                  {coverImage && <Typography variant="caption">{coverImage.name}</Typography>}
                </Grid>
              </Grid>
              {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  background: "linear-gradient(90deg, #d81b60 0%, #1976d2 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  boxShadow: 3,
                  "&:hover": {
                    background: "linear-gradient(90deg, #ad1457 0%, #1565c0 100%)",
                  },
                }}
              >
                Register
              </Button>
              <Button href="/login" fullWidth variant="text">
                Already have an account? Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 