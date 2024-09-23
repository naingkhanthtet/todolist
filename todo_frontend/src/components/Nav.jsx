import React from "react";
import "../App.css";
import { FaCheck } from "react-icons/fa6";

export default function Nav() {
    return (
        <nav>
            <p className="nav-header">
                To Do List <FaCheck className="nav-logo" />
            </p>
        </nav>
    );
}
