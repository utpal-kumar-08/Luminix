import React from "react";
import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";

export default function Subscriptions() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="#fff" sx={{ mb: 4 }}>
        Subscriptions
      </Typography>
      <Grid container spacing={4}>
        {[1,2,3].map((id) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, background: "#232323", color: "#fff", display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ mr: 2 }} />
              <Box>
                <Typography variant="h6">Channel {id} (Placeholder)</Typography>
                <Typography color="#aaa">123K subscribers</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 