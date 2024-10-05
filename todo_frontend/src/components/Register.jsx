import React, { useState } from "react";
import axiosInstance from "../interceptor/axiosInstance";
import "./styles/Register.css";
import { useNavigate } from "react-router-dom";
import {
    StyledBox,
    StyledButton,
    StyledForm,
    StyledInput,
} from "./styles/StyledComponents";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        re_password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        } else if (formData.password !== formData.re_password) {
            alert("Password do not match");
        } else {
            try {
                const res = await axiosInstance.post(`/auth/users/`, formData);
                if (res.status >= 200 && res.status <= 300) {
                    alert("Registration successful");
                    navigate("/login");
                }
            } catch (err) {
                console.log("Error registering", err);
                if (err.response && err.response.status === 400) {
                    alert("User already exists or invalid data");
                } else {
                    alert("Registration failed. Please try again.");
                }
            }
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
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Your fake email"
                    required
                />
                <StyledInput
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Your secure password"
                    required
                />
                <StyledInput
                    type="password"
                    name="re_password"
                    onChange={handleChange}
                    placeholder="Retype your secure password"
                    required
                />
                <StyledButton
                    type="submit"
                    sx={{ width: "fit-content", marginTop: "20px" }}
                >
                    Submit
                </StyledButton>
            </StyledForm>
        </StyledBox>
    );
};

export default Register;
