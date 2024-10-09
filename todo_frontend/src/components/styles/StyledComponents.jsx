import { Toolbar, Typography, Box, TextField } from "@mui/material";
import { styled } from "@mui/system";

export const NavText = styled(Typography)({
    fontSize: "3rem",
    textAlign: "left",
    gridColumn: 1,
    padding: "10px",
});

export const DropdownComponent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.text.primary}`,
    position: "absolute",
    margin: "0",
    padding: "0",
    display: "flex",
    justifyContent: "center",
    top: "70px",
    right: "25px",
    cursor: "pointer",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    flexDirection: "column",
    zIndex: "1000",
}));

export const StyledTextarea = styled(TextField)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    resize: "none",
    textAlign: "left",
    fontFamily: "Lora",
    fontSize: "1.5rem",
    padding: "10px",
}));

export const TaskTitle = styled(Box)({
    padding: "10px",
    fontSize: "1.5rem",
});

export const StyledBox = styled(Toolbar)({
    maxWidth: "500px",
    margin: "auto",
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "auto 50px",
});

export const StyledArea = styled(Toolbar)({
    maxWidth: "500px",
    margin: "auto",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
});

export const StyledIcons = styled(Box)({
    gridColumn: 2,
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
});

export const StyledButton = styled(Box)(({ theme }) => ({
    outline: "none",
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
    fontSize: "1.5rem",
    padding: "10px",
    fontFamily: "Lora",
    border: "none",
    textAlign: "center",
    cursor: "pointer",
    ":hover": {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.background.paper,
    },
})).withComponent("button");

export const StyledForm = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    textAlign: "left",
    width: "100%",
});

export const AccountMessage = styled(Box)({
    cursor: "pointer",
    padding: "10px",
    textDecoration: "underline",
});
