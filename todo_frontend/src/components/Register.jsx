import React, { useState } from "react";
import axios from "axios";
import "./styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        } else if (formData.password !== formData.re_password) {
            alert("Password do not match");
        } else {
            axios
                .post(`/auth/users/`, formData)
                .then((res) => {
                    setToken(res.data.token);
                    alert("Registration is successful");
                    navigate("/home");
                })
                .catch((err) => console.error("Registration failed", err));
        }
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    placeholder="Your username"
                    className="register-username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Your fake email"
                    className="register-email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Your secure password"
                    className="register-password"
                    required
                />
                <input
                    type="password"
                    name="re_password"
                    onChange={handleChange}
                    placeholder="Retype your secure password"
                    className="register-repassword"
                    required
                />
                <button type="submit" className="register-submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
