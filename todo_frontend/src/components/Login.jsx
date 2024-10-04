import React, { useState } from "react";
import axiosInstance from "../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

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
        <div className="login-page">
            <div className="login-contents">
                <form onSubmit={handleSubmit} className="login-form">
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Your username"
                        className="login-username"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Your secure password"
                        className="login-password"
                        required
                    />
                    <button type="submit" className="login-submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
