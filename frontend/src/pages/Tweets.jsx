import React from "react";
import { Box, Typography, Button, Grid, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

export default function Tweets() {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#fff" sx={{ flexGrow: 1 }}>
          Tweets
        </Typography>
        <Button variant="contained" color="primary" startIcon={<ChatIcon />}>Create Tweet</Button>
      </Box>
      <Grid container spacing={4}>
        {[1,2,3].map((id) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Paper elevation={6} sx={{ p: 3, borderRadius: 3, background: "#232323", color: "#fff" }}>
              <Typography variant="h6">Tweet {id} (Placeholder)</Typography>
              <Typography color="#aaa">Tweet content...</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 