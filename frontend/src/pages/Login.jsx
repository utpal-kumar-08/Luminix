import React, { useState } from "react";
import { Container, Box, TextField, Button, Typography, Paper, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/users/login", form, { withCredentials: true });
      alert("Login successful!");
      // TODO: Save token, redirect, etc.
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #e3f2fd 0%, #fce4ec 100%)" }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 3, background: "rgba(255,255,255,0.85)" }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
              />
              {error && <Typography color="error">{error}</Typography>}
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
                Login
              </Button>
              <Button href="/register" fullWidth variant="text">
                Don't have an account? Register
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 