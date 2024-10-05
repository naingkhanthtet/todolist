import React from "react";
import { StyledButton } from "./styles/StyledComponents";

const Theme = ({ isDarkMode, toggleTheme }) => {
    return (
        <StyledButton onClick={toggleTheme}>
            {isDarkMode ? "Light" : "Dark"}
        </StyledButton>
        // <button onClick={toggleTheme} className="theme-button">
        //     {isDarkMode ? "Light" : "Dark"}
        // </button>
    );
};

export default Theme;
