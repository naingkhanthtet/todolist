import React, { useState } from "react";
import axiosInstance from "../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
    AccountMessage,
    StyledArea,
    StyledButton,
    StyledForm,
    StyledTextarea,
} from "./styles/StyledComponents";
import { Button } from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosInstance.post(`/token/`, formData);
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("taskEdits");
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            setToken(data.access);

            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${data["access"]}`;
            navigate("/home");
        } catch (err) {
            console.error("login error", err);
            alert("Login failed");
        }
    };

    return (
        <StyledArea>
            <StyledForm component="form" onSubmit={handleSubmit}>
                {/* login username */}
                <StyledTextarea
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Your Username"
                    label="Your Username"
                    variant="standard"
                    InputProps={{
                        style: { fontSize: "1.5rem" },
                    }}
                    InputLabelProps={{ style: { padding: "10px" } }}
                    required
                />
                {/* login password */}
                <StyledTextarea
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="Your Password"
                    label="Your Password"
                    variant="standard"
                    InputProps={{
                        style: { fontSize: "1.5rem" },
                        endAdornment: (
                            <Button
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </Button>
                        ),
                    }}
                    InputLabelProps={{ style: { padding: "10px" } }}
                    required
                />
                <StyledButton
                    type="submit"
                    sx={{ width: "fit-content", marginTop: "20px" }}
                >
                    Submit
                </StyledButton>
                <AccountMessage onClick={() => navigate("/register")}>
                    New to ToDoList?
                </AccountMessage>
            </StyledForm>
        </StyledArea>
    );
};

export default Login;
