import React from "react";
import "../App.css";
import { IoMenuSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import Logout from "./Logout";

export default function Nav() {
    const location = useLocation();
    let navTitle = "ToDoList";

    if (location.pathname === "/register") {
        navTitle = "Register ToDoList";
    } else if (location.pathname === "/login") {
        navTitle = "Login ToDoList";
    }

    const showMenu =
        location.pathname !== "/register" && location.pathname !== "/login";

    return (
        <nav>
            <div className="nav-header">
                <p className="nav-text">{navTitle}</p>

                {showMenu && (
                    <div className="nav-menu">
                        <IoMenuSharp />
                    </div>
                )}

                {showMenu && (
                    <div className="nav-menu">
                        <Logout />
                    </div>
                )}
            </div>
        </nav>
    );
}
