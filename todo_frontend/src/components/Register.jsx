import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import {
    StyledBox,
    StyledButton,
    StyledForm,
    StyledInput,
} from "./styles/StyledComponents";
import { validationSchema } from "./validationSchema";

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (formData) => {
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
    };

    return (
        <StyledBox>
            <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
                <StyledInput
                    type="text"
                    placeholder="Your username"
                    {...register("username")}
                    required
                />
                {errors.username && <span>{errors.username.message}</span>}
                <StyledInput
                    type="email"
                    placeholder="Your fake email"
                    {...register("email")}
                    required
                />
                {errors.email && <span>{errors.email.message}</span>}
                <StyledInput
                    type="password"
                    placeholder="Your secure password"
                    {...register("password")}
                    required
                />
                {errors.password && <span>{errors.password.message}</span>}
                <StyledInput
                    type="password"
                    placeholder="Retype your secure password"
                    {...register("re_password")}
                    required
                />
                {errors.re_password && (
                    <span>{errors.re_password.message}</span>
                )}
                <StyledButton
                    type="submit"
                    sx={{ width: "fit-content", marginTop: "20px" }}
                >
                    Submit
                </StyledButton>
                <Box
                    sx={{
                        cursor: "pointer",
                        padding: "10px",
                    }}
                    onClick={() => navigate("/login")}
                >
                    Already a registered user?
                </Box>
            </StyledForm>
        </StyledBox>
    );
};

export default Register;
