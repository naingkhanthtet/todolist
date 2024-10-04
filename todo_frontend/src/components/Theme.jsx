import React, { useEffect } from "react";
import "../App.css";
import "./styles/Nav.css";

const Theme = ({ isDarkMode, toggleTheme }) => {
    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
        localStorage.setItem("isDarkMode", isDarkMode);
    }, [isDarkMode]);

    return (
        <button onClick={toggleTheme} className="theme-button">
            {isDarkMode ? "Light" : "Dark"}
        </button>
    );
};

export default Theme;
