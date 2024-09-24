import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`/auth/users/`, formData)
            .then((res) => {
                alert("Registration is successful");
            })
            .catch((err) => console.error("Registration failed", err));
    };

    return (
        <div className="register-page">
            <div className="register-contents">
                <p className="register-header">Create fake account</p>
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
                    <br />
                    <button type="submit" className="register-submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
