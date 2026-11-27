import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar () {
  const location = useLocation();
  const path = location.pathname;
  const [contextText, setContextText] = useState("");
  useEffect(() => {
    if (path.startsWith("/users/")) {
      const userId = path.split("/users/")[1];
      fetchModel(`/user/${userId}`)
        .then((user) => {
          setContextText(`${user.first_name} ${user.last_name}`);
        })
        .catch(() => setContextText(""));
    } else if (path.startsWith("/photos/")) {
      const userId = path.split("/photos/")[1];
      fetchModel(`/user/${userId}`)
        .then((user) => {
          setContextText(`Photos of ${user.first_name} ${user.last_name}`);
        })
        .catch(() => setContextText(""));
    } else {
      setContextText("");
    }
  }, [path]);
    return (
      <AppBar className="topbar-appBar" position="absolute">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" color="inherit">
            Hồ Quang Minh
          </Typography>
          <Typography variant="h5" color="inherit">{contextText}</Typography>
        </Toolbar>
      </AppBar>
    );
}

export default TopBar;
