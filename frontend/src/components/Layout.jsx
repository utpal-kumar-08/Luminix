import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, CssBaseline, Divider, InputBase, Avatar, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChatIcon from "@mui/icons-material/Chat";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const drawerWidth = 220;

const navLinks = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Subscriptions", path: "/subscriptions", icon: <SubscriptionsIcon /> },
  { label: "Playlists", path: "/playlists", icon: <PlaylistPlayIcon /> },
  { label: "Upload", path: "/upload", icon: <CloudUploadIcon /> },
  { label: "Tweets", path: "/tweets", icon: <ChatIcon /> },
  { label: "Profile", path: "/profile", icon: <AccountCircleIcon /> },
];

export default function Layout({ children, mode, setMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/videos?query=${encodeURIComponent(search)}`);
  };

  const drawer = (
    <div>
      <Toolbar sx={{ minHeight: 64 }} />
      <Divider />
      <List>
        {navLinks.map((item) => (
          <ListItem button key={item.label} component={RouterLink} to={item.path} onClick={() => setMobileOpen(false)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "#212121" }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component={RouterLink} to="/" sx={{ color: "#fff", textDecoration: "none", fontWeight: "bold", flexGrow: 0 }}>
            <span style={{ color: "#ff0000" }}>▶</span> ChaiTube
          </Typography>
          <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, mx: 4, display: { xs: "none", sm: "flex" }, alignItems: "center", background: "#333", borderRadius: 2, px: 2 }}>
            <InputBase
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ color: "#fff", flex: 1 }}
            />
            <IconButton type="submit" sx={{ color: "#fff" }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Button component={RouterLink} to="/upload" color="inherit" startIcon={<CloudUploadIcon />} sx={{ ml: 2, display: { xs: "none", sm: "inline-flex" }, fontWeight: "bold" }}>
            Upload
          </Button>
          <IconButton
            sx={{ ml: 2 }}
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            color="inherit"
            aria-label="toggle dark mode"
          >
            {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Avatar sx={{ ml: 2, bgcolor: "#d81b60", cursor: "pointer" }} component={RouterLink} to="/profile" />
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth, background: "#181818", color: "#fff" } }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` }, minHeight: "100vh", background: mode === "dark" ? "#181818" : "#f9f9f9" }}>
        <Toolbar sx={{ minHeight: 64 }} />
        {children}
      </Box>
    </Box>
  );
} 