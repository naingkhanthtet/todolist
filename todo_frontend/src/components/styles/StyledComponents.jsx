import { TextareaAutosize } from "@mui/base";
import { Toolbar, Typography, Box, Button } from "@mui/material";
import { borderColor, styled } from "@mui/system";

export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: "none",
    outline: "none",
    padding: "10px",
    resize: "none",
    textAlign: "left",
    fontFamily: "Lora",
    fontSize: "1.5rem",
}));

export const NavText = styled(Typography)({
    fontSize: "3rem",
    textAlign: "left",
    gridColumn: 1,
    padding: "10px",
});

export const StyledBox = styled(Toolbar)({
    maxWidth: "500px",
    margin: "auto",
    padding: "10px",
    display: "grid",
    gridTemplateColumns: "auto 50px",
    paddingTop: "10px",
});

export const StyledIcons = styled(Box)({
    gridColumn: 2,
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    fontSize: "3rem",
    cursor: "pointer",
});

export const DropdownComponent = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
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
}));

export const StyledButton = styled(Box)(({ theme }) => ({
    outline: "none",
    color: theme.palette.text.primary,
    fontSize: "1.5rem",
    padding: "15px",
    fontFamily: "Lora",
    border: "none",
    "&:hover": {
        border: "1px",
        borderColor: theme.palette.primary.main,
    },
}));
