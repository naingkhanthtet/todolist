import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };

    return (
        <div>
            <p onClick={handleLogout}>Logout</p>
        </div>
    );
};

export default Logout;
