import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import VideoList from "./pages/VideoList";
import VideoUpload from "./pages/VideoUpload";
import VideoDetail from "./pages/VideoDetail";
import Playlists from "./pages/Playlists";
import PlaylistDetail from "./pages/PlaylistDetail";
import Profile from "./pages/Profile";
import Tweets from "./pages/Tweets";
import Subscriptions from "./pages/Subscriptions";
import Healthcheck from "./pages/Healthcheck";
import Layout from "./components/Layout";

export default function App() {
  const [mode, setMode] = useState("dark");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: "#ff0000" },
          secondary: { main: "#1976d2" },
          background: {
            default: mode === "dark" ? "#181818" : "#f9f9f9",
            paper: mode === "dark" ? "#232323" : "#fff",
          },
          text: {
            primary: mode === "dark" ? "#fff" : "#181818",
            secondary: mode === "dark" ? "#aaa" : "#333",
          },
        },
        typography: {
          fontFamily: "'Montserrat', 'Roboto', 'Arial', sans-serif",
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="*"
            element={
              <Layout mode={mode} setMode={setMode}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/videos" element={<VideoList />} />
                  <Route path="/videos/:videoId" element={<VideoDetail />} />
                  <Route path="/upload" element={<VideoUpload />} />
                  <Route path="/playlists" element={<Playlists />} />
                  <Route path="/playlists/:playlistId" element={<PlaylistDetail />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/tweets" element={<Tweets />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/healthcheck" element={<Healthcheck />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
} 