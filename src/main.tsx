import React from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
