import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "./styles/StyledComponents";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        (async () => {
            try {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("taskEdits");
                navigate("/login");
            } catch (e) {
                console.log("logout not working");
            }
        })();
    };

    return (
        <StyledButton onClick={handleLogout}>Logout</StyledButton>
        // <div onClick={handleLogout} className="logout-button">
        //     Logout
        // </div>
    );
};

export default Logout;
