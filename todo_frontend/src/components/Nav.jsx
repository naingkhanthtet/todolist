import React from "react";
import "../App.css";
import { IoMenuSharp } from "react-icons/io5";
import Logout from "./Logout";

export default function Nav() {
    return (
        <nav>
            <div className="nav-header">
                <p className="nav-text">To Do List</p>

                <div className="nav-menu">
                    <IoMenuSharp />
                </div>

                <div className="nav-menu">
                    <Logout />
                </div>
            </div>
        </nav>
    );
}
