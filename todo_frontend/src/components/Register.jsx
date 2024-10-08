import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axiosInstance from "../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import {
    AccountMessage,
    StyledBox,
    StyledButton,
    StyledForm,
    StyledInput,
} from "./styles/StyledComponents";
import { validationSchema } from "./validationSchema";
import { StyledTextarea } from "./styles/StyledComponents";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showRePassword, setShowRePassword] = React.useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
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
                {/* username */}
                <StyledTextarea
                    type="text"
                    placeholder="Your username"
                    {...register("username")}
                    label="Your Username"
                    variant="standard"
                    error={!!errors.username}
                    helperText={errors.username?.message}
                    inputProps={{
                        style: { fontSize: "1.5rem" },
                    }}
                    InputLabelProps={{
                        style: { padding: "10px" },
                    }}
                    required
                />
                {/* email */}
                <StyledTextarea
                    type="email"
                    placeholder="Your Fake Email"
                    {...register("email")}
                    label="Your Fake Email"
                    variant="standard"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    inputProps={{
                        style: { fontSize: "1.5rem" },
                    }}
                    InputLabelProps={{ style: { padding: "10px" } }}
                    required
                />
                {/* Password */}
                <StyledTextarea
                    type={showPassword ? "text" : "password"}
                    placeholder="Your Secure Password"
                    label="Your Secure Password"
                    {...register("password")}
                    variant="standard"
                    error={!!errors.password}
                    helperText={errors.password?.message}
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
                {/* Retype password */}
                <StyledTextarea
                    type={showRePassword ? "text" : "password"}
                    placeholder="Retype your Secure Password"
                    label="Retype your Secure Password"
                    {...register("re_password")}
                    variant="standard"
                    error={!!errors.re_password}
                    helperText={errors.re_password?.message}
                    InputProps={{
                        style: { fontSize: "1.5rem" },
                        endAdornment: (
                            <Button
                                onClick={() =>
                                    setShowRePassword(!showRePassword)
                                }
                            >
                                {showRePassword ? <FaEye /> : <FaEyeSlash />}
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
                <AccountMessage onClick={() => navigate("/login")}>
                    Already a registered user?
                </AccountMessage>
            </StyledForm>
        </StyledBox>
    );
};

export default Register;
