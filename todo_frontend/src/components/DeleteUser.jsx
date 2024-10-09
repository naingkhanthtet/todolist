import React, { useEffect, useState } from "react";
import { StyledButton } from "./styles/StyledComponents";
import axiosInstance from "../interceptor/axiosInstance";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

const DeleteUser = () => {
    const [userId, setUserId] = useState(null);
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await axiosInstance.get("/user/");
                setUserId(res.data.id);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, []);

    const handleDelete = async () => {
        try {
            const res = await axiosInstance.delete(`/user/delete/${userId}/`);
            if (res.status === 204) {
                alert("Account deleted successfully");
                navigate("/login");
            }
        } catch (err) {
            console.log("Error deleting account", err);
            alert("Failed to delete the user");
        }
    };

    return (
        <>
            <StyledButton onClick={handleOpen} sx={{ color: "red" }}>
                Delete Account
            </StyledButton>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ "& .MuiPaper-root": { borderRadius: 0 } }}
            >
                <DialogTitle>Delete account</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* Confirm Delete Button */}
                    <StyledButton
                        onClick={() => {
                            handleDelete();
                            handleClose();
                        }}
                        sx={{ color: "red" }}
                    >
                        Delete
                    </StyledButton>
                    {/* Cancel Button */}
                    <StyledButton
                        onClick={handleClose}
                        sx={{ fontSize: "1rem" }}
                    >
                        Discard
                    </StyledButton>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteUser;
