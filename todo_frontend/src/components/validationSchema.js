import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
        .email("Must be a valid email")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/\d/, "Must contain a number")
        .matches(/[!@#$%^&*]/, "Must contain a special character"),
    re_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please re-enter your password"),
});
