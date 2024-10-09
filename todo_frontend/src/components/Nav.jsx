import React from "react";
import { useLocation } from "react-router-dom";
import { NavText, StyledBox, StyledIcons } from "./styles/StyledComponents";
import { MdOutlineLightMode, MdOutlineDarkMode, MdHome } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContextProvider";

export default function Nav() {
    const { isDarkMode, toggleTheme } = useThemeContext();
    const location = useLocation();
    const navigate = useNavigate();
    let navTitle = "ToDoList";

    if (location.pathname === "/register") {
        navTitle = "Register ToDoList";
    } else if (location.pathname === "/login") {
        navTitle = "Login ToDoList";
    }
    const showSettings =
        location.pathname !== "/register" && location.pathname !== "/login";

    const navigateSettings = () => {
        navigate("/settings");
    };

    const navigateHome = () => {
        navigate("/home");
    };

    return (
        <StyledBox>
            <NavText>{navTitle}</NavText>

            {showSettings ? (
                <StyledIcons sx={{ fontSize: "3rem" }}>
                    {location.pathname === "/home" ? (
                        <MdSettings onClick={navigateSettings} />
                    ) : (
                        <MdHome onClick={navigateHome} />
                    )}
                </StyledIcons>
            ) : (
                <StyledIcons onClick={toggleTheme} sx={{ fontSize: "1.5rem" }}>
                    {isDarkMode ? (
                        <MdOutlineLightMode />
                    ) : (
                        <MdOutlineDarkMode />
                    )}
                </StyledIcons>
            )}
        </StyledBox>
    );
}
