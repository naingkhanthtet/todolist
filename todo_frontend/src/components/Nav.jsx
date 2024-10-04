import React, { useEffect, useState } from "react";
// import "./styles/Nav.css";
import { IoMenuSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Logout from "./Logout";
import Theme from "./Theme";

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
        <nav>
            <div className="nav-header">
                <p className="nav-text">{navTitle}</p>

                {showMenu && (
                    <div className="nav-menu" onClick={toggleMenu}>
                        <IoMenuSharp className="nav-menu-icon" />

                        {dropDown && (
                            <div className="nav-dropdown">
                                <Logout />
                                <Theme
                                    toggleTheme={toggleTheme}
                                    isDarkMode={isDarkMode}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}
