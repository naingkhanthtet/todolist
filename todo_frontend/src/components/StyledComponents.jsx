import { TextareaAutosize } from "@mui/base";
import { styled } from "@mui/system";

export const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: "none",
    outline: "none",
    padding: "10px",
    resize: "none",
    textAlign: "left",
    fontFamily: "Lora",
}));
