import React, { useState } from "react";
import axiosInstance from "../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
    AccountMessage,
    StyledBox,
    StyledButton,
    StyledForm,
    StyledInput,
} from "./styles/StyledComponents";
import { Box } from "@mui/system";

const Login = ({ setToken }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
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
        <StyledBox>
            <StyledForm component="form" onSubmit={handleSubmit}>
                <StyledInput
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Your username"
                    required
                />
                <StyledInput
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Your secure password"
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
        </StyledBox>
    );
};

export default Login;
