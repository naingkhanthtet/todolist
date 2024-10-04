import "@fontsource/lora";
import "@fontsource/lora/400.css";
import "@fontsource/lora/400-italic.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import "./interceptor/axios";
import axiosInstance from "./axiosInstance";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
