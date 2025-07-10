// src/components/TopBar.js
"use client";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";

export default function TopBar({ onMenuClick }) {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#1e3c72",
        display: { xs: "flex", sm: "none" },
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Image src={"/logo.png"} alt="logo" width={24} height={24} />
        <Typography variant="h6" noWrap marginLeft={1}>
          SolicitorSense
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
