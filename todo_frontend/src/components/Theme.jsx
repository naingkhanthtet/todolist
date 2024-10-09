import React from "react";
import { StyledButton } from "./styles/StyledComponents";
import { useThemeContext } from "../ThemeContextProvider";

const Theme = () => {
    const { isDarkMode, toggleTheme } = useThemeContext();

    return (
        <StyledButton onClick={toggleTheme}>
            {isDarkMode ? "Switch to Light mode" : "Switch to Dark mode"}
        </StyledButton>
    );
};

export default Theme;
