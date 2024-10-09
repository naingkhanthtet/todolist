import "@fontsource/lora";
import "@fontsource/lora/400.css";
import "@fontsource/lora/400-italic.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeContextProvider } from "./ThemeContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ThemeContextProvider>
            <App />
        </ThemeContextProvider>
    </React.StrictMode>
);

reportWebVitals();
