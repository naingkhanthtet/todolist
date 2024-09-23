import React from "react";
import "../App.css";
import { IoMenuSharp } from "react-icons/io5";

export default function Nav() {
    return (
        <nav>
            <div className="nav-header">
                <p className="nav-text">To Do List</p>

                <div className="nav-menu">
                    <IoMenuSharp />
                </div>
            </div>
        </nav>
    );
}
