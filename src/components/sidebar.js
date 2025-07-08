"use client";

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Box,
  useMediaQuery,
} from "@mui/material";
import {
  Chat as ChatIcon,
  Home as HomeIcon,
  Menu as MenuIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;
const collapsedWidth = 70;

const menuItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Chats", icon: <ChatIcon />, path: "/chats" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s",
          overflowX: "hidden",
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: open ? "flex-end" : "center",
          p: 1,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      </Box>

      <List>
        {menuItems.map((item) => (
          <Tooltip
            title={!open ? item.label : ""}
            placement="right"
            key={item.label}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
