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
  Typography,
  useMediaQuery,
  Divider,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Chat as ChatIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;
const collapsedWidth = 72;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(!isMobile);
  const [chats, setChats] = useState([
    { id: "1", label: "Chat #1" },
    { id: "2", label: "Chat #2" },
    { id: "3", label: "Chat #3" },
  ]);
  const [activeChatId, setActiveChatId] = useState("1");

  const toggleSidebar = () => setOpen(!open);

  const handleChatClick = (chat) => {
    setActiveChatId(chat.id);
    router.push(`/chat?id=${chat.id}`); // optional routing
  };

  const handleNewChat = () => {
    const newId = (chats.length + 1).toString();
    const newChat = { id: newId, label: `Chat #${newId}` };
    setChats([newChat, ...chats]);
    setActiveChatId(newId);
    router.push(`/chat?id=${newId}`);
  };

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={toggleSidebar}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile
      }}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          overflowX: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          borderRight: "1px solid #ddd",
        },
      }}
    >
      {/* 🔝 Top: Logo + Toggle */}
      <Box
        sx={{
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          px: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        {open && <Typography variant="h6">SolicitorSense</Typography>}
        <IconButton onClick={toggleSidebar} size="small">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* 🧾 Chat List (scrollable) */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {chats.map((chat) => {
            const isActive = activeChatId === chat.id;
            return (
              <Tooltip
                key={chat.id}
                title={!open ? chat.label : ""}
                placement="right"
              >
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleChatClick(chat)}
                    selected={isActive}
                    sx={{
                      px: 2,
                      backgroundColor: isActive
                        ? "primary.light"
                        : "transparent",
                      "&.Mui-selected": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "primary.dark",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{ color: isActive ? "inherit" : "text.secondary" }}
                    >
                      <ChatIcon />
                    </ListItemIcon>
                    {open && <ListItemText primary={chat.label} />}
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* ➕ New Chat Button at Bottom */}
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth={open}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewChat}
          sx={{
            minHeight: 40,
            justifyContent: open ? "flex-start" : "center",
          }}
        >
          {open && "New Chat"}
        </Button>
      </Box>
    </Drawer>
  );
}
