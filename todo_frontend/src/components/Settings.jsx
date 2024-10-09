import React from "react";
import Logout from "./Logout";
import Theme from "./Theme";
import DeleteUser from "./DeleteUser";
import { useNavigate } from "react-router-dom";
import { StyledArea, StyledButton } from "./styles/StyledComponents";

const Settings = () => {
    const navigate = useNavigate();
    const navigateHome = () => {
        navigate("/home");
    };
    return (
        <StyledArea>
            <Logout />
            <Theme />
            <StyledButton onClick={navigateHome}>Go back to tasks</StyledButton>
            <DeleteUser />
        </StyledArea>
    );
};

export default Settings;
