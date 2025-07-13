// src/components/Sidebar.js
"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import {
  Add,
  ChatBubbleOutline,
  KeyboardArrowDown,
  KeyboardTab,
  Logout,
} from "@mui/icons-material";
import useHasMounted from "@/hooks/useHasMounted";
import useSidebar from "./useSidebar";

export default function Sidebar({
  userId,
  sessionId,
  fetchDataForSession,
  initiateNewChat,
  mobileOpen,
  setMobileOpen,

  children,
}) {
  const hasMounted = useHasMounted();
  const {
    isOpen,
    toggleSidebar,
    isMobile,
    data = [],
    anchorEl,
    openAvatar,
    handleClickAvatar,
    handleCloseAvatar,
    handleLogout,
  } = useSidebar({
    userId,
    sessionId,
  });

  if (!hasMounted) return null;

  const drawerWidth = isOpen || isMobile ? 260 : 66;

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen || isMobile ? "space-between" : "center",
          height: 64,
          px: 2,
          paddingBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Image src={"/logo.png"} alt="logo" width={30} height={30} />
          <Typography
            variant="h6"
            color="#1e3c72"
            fontWeight={"bold"}
            fontSize={"1rem"}
            marginTop={"4px"}
          >
            {isOpen ? "SolicitorSense" : ""}
          </Typography>
        </Box>

        {!isMobile && isOpen && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              padding: "4px",
              marginBottom: "4px",
              "& .MuiTouchRipple-root": {
                borderRadius: "8px",
              },
              "&:hover": {
                backgroundColor: "#dce3f0",
                borderRadius: "8px",
              },
            }}
          >
            <KeyboardTab sx={{ transform: "scaleX(-1)", color: "#1e3c72" }} />
          </IconButton>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen || isMobile ? "space-between" : "center",
          px: 2,
        }}
      >
        {!isMobile && !isOpen && (
          <Tooltip title="Open sidebar" placement="right">
            <IconButton
              onClick={toggleSidebar}
              sx={{
                padding: "4px",
                marginBottom: "4px",
                "& .MuiTouchRipple-root": {
                  borderRadius: "8px",
                },
                "&:hover": {
                  backgroundColor: "#dce3f0",
                  borderRadius: "8px",
                },
              }}
            >
              <KeyboardTab sx={{ color: "#1e3c72" }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <>
        {isOpen || isMobile ? (
          <Box sx={{ px: 2, py: 2 }}>
            <Button
              fullWidth
              variant="contained"
              startIcon={<Add />}
              onClick={initiateNewChat}
              sx={{
                background: "#1e3c72",
              }}
            >
              New Chat
            </Button>
          </Box>
        ) : (
          <Box sx={{ px: 2, py: 0 }}>
            <Tooltip title="New Chat" placement="right">
              <IconButton
                onClick={initiateNewChat}
                sx={{ mx: "auto", display: "block", padding: "0px" }}
              >
                <Add
                  sx={{
                    background: "#1e3c72",
                    padding: "4px",
                    borderRadius: "4px",
                    color: "#f5f4ed",
                  }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </>

      <Box sx={{ flexGrow: 1, overflowY: "auto", px: isOpen ? 1 : 0 }}>
        {data.length >= 0 && (isOpen || isMobile) && (
          <Typography
            variant="subtitle2"
            sx={{ px: 2, mb: 1, color: "text.secondary" }}
          >
            Recent
          </Typography>
        )}
        <List>
          {data.map((chat) => {
            const isActive = sessionId === chat.sessionId;
            const item = (
              <ListItemButton
                selected={isActive}
                onClick={() => fetchDataForSession(chat.sessionId)}
                sx={{
                  justifyContent: isOpen ? "flex-start" : "center",
                  px: isOpen ? 2 : 1,
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: isOpen ? 2 : 0 }}>
                  <ChatBubbleOutline />
                </ListItemIcon>
                {isOpen && (
                  <ListItemText
                    primary={chat.msg}
                    primaryTypographyProps={{ noWrap: true, fontSize: 14 }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem key={chat.sessionId} disablePadding>
                {isOpen ? item : <Tooltip title={chat.msg}>{item}</Tooltip>}
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isOpen ? "space-between" : "center",
          px: 2,
          py: 2,
          cursor: "pointer",
        }}
        id="profile"
        aria-controls={openAvatar ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openAvatar ? "true" : undefined}
        onClick={handleClickAvatar}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: isOpen ? 1 : 0,
              background: "#1e3c72",
              color: "white",
            }}
          >
            <Typography variant="h8" fontSize={14}>
              Y
            </Typography>
          </Avatar>
          {isOpen && (
            <Typography variant="body2" fontWeight={"bold"}>
              You
            </Typography>
          )}
        </Box>
        {isOpen && <KeyboardArrowDown sx={{ color: "#1e3c72" }} />}
      </Box>
      <Menu
        id="profile"
        anchorEl={anchorEl}
        open={openAvatar}
        onClose={handleCloseAvatar}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
          paper: {
            sx: {
              minWidth: 180,
            },
          },
        }}
      >
        <MenuItem
          onClick={() => {
            console.log("clicked");
            handleLogout();
          }}
          sx={{
            px: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Logout fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#f5f4ed",
            overflowX: "hidden",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)",
            transition: "all .4s ease",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            transition: "width 0.3s ease",
            boxSizing: "border-box",
            background: "#f5f4ed",
            overflowX: "hidden",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)",
            transition: "all .4s ease",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          ml: { sm: `${drawerWidth}px` }, // Shift content right by sidebar width
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
          transition: "margin-left 0.3s ease, width 0.3s ease",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
