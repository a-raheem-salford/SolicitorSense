import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Toaster({ toast, setToast }) {
  const handleClose = () => {
    setToast({ ...toast, open: false });
  };
  console.log("toast", toast);

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={toast.severity}
        elevation={6}
        variant="filled"
      >
        {toast.message}
      </MuiAlert>
    </Snackbar>
  );
}
