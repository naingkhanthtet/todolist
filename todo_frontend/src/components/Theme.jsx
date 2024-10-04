import React from "react";

const Theme = ({ isDarkMode, toggleTheme }) => {
    return (
        <button onClick={toggleTheme} className="theme-button">
            {isDarkMode ? "Light" : "Dark"}
        </button>
    );
};

export default Theme;
