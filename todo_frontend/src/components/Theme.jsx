import React from "react";
import { StyledButton } from "./styles/StyledComponents";

const Theme = ({ isDarkMode, toggleTheme }) => {
    return (
        <StyledButton onClick={toggleTheme}>
            {isDarkMode ? "Light" : "Dark"}
        </StyledButton>
    );
};

export default Theme;
