import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const navLinks = [
  { label: "Dashboard", path: "/" },
  { label: "Videos", path: "/videos" },
  { label: "Upload", path: "/upload" },
  { label: "Playlists", path: "/playlists" },
  { label: "Tweets", path: "/tweets" },
  { label: "Profile", path: "/profile" },
  { label: "Healthcheck", path: "/healthcheck" },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg, #1976d2 0%, #d81b60 100%)" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", letterSpacing: 1 }}>
          Chai Aur Major Project
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              color="inherit"
              component={RouterLink}
              to={link.path}
              sx={{ fontWeight: "bold", textTransform: "none" }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenu}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {navLinks.map((link) => (
              <MenuItem
                key={link.path}
                component={RouterLink}
                to={link.path}
                onClick={handleClose}
              >
                {link.label}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 