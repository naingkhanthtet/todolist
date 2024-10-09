import React from "react";
import { StyledButton } from "./styles/StyledComponents";
// import axiosInstance from "../interceptor/axiosInstance";
// import { useNavigate } from "react-router-dom";

const DeleteUser = () => {
    // const navigate = useNavigate();
    // const handleDelete = async () => {
    //     try {
    //         const res = await axiosInstance.delete(`/user/delete/`, formData);
    //         if (res.status >= 200 && res.status <= 300) {
    //             alert("Registration successful");
    //             navigate("/login");
    //         }
    //     } catch (err) {
    //         console.log("Error registering", err);
    //         if (err.response && err.response.status === 400) {
    //             alert("User already exists or invalid data");
    //         } else {
    //             alert("Registration failed. Please try again.");
    //         }
    //     }
    // };

    return <StyledButton>Delete Account</StyledButton>;
};

export default DeleteUser;
