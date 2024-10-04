import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Logout.css";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        (async () => {
            try {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate("/login");
            } catch (e) {
                console.log("logout not working");
            }
        })();
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
};

export default Logout;
