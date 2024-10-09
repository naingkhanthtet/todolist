import React, { useEffect, useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Logout from "./Logout";
import Theme from "./Theme";
import {
    DropdownComponent,
    NavText,
    StyledBox,
    StyledButton,
    StyledIcons,
} from "./styles/StyledComponents";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import DeleteUser from "./DeleteUser";

export default function Nav({ toggleTheme, isDarkMode }) {
    const [dropDown, setDropdown] = useState(false);
    const location = useLocation();
    let navTitle = "ToDoList";

    if (location.pathname === "/register") {
        navTitle = "Register ToDoList";
    } else if (location.pathname === "/login") {
        navTitle = "Login ToDoList";
    }

    const showMenu =
        location.pathname !== "/register" && location.pathname !== "/login";

    const toggleMenu = () => {
        setDropdown(!dropDown);
    };

    useEffect(() => {
        setDropdown(false);
    }, [location]);

    return (
        <StyledBox>
            <NavText>{navTitle}</NavText>

            {showMenu ? (
                <StyledIcons onClick={toggleMenu} sx={{ fontSize: "3rem" }}>
                    <IoMenuSharp
                        className="nav-menu-icon"
                        style={{ opacity: dropDown ? 0.5 : 1 }}
                        onBlur={() => setDropdown(false)}
                    />

                    {dropDown && (
                        <DropdownComponent>
                            <Logout />
                            <Theme
                                toggleTheme={toggleTheme}
                                isDarkMode={isDarkMode}
                            />
                            <DeleteUser />
                        </DropdownComponent>
                    )}
                </StyledIcons>
            ) : (
                <StyledButton onClick={toggleTheme}>
                    {isDarkMode ? (
                        <MdOutlineLightMode />
                    ) : (
                        <MdOutlineDarkMode />
                    )}
                </StyledButton>
            )}
        </StyledBox>
    );
}
