import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledFooterSection = styled(Box)(({ theme }) => ({
    maxWidth: "500px",
    padding: "34px",
    margin: "auto",
    fontSize: "1rem",
}));

export const StyledFooter = styled(Box)(({ theme }) => ({
    borderTop: `1px solid ${theme.palette.text.primary}`,
    marginTop: "200px",
    display: "flex",
    paddingTop: "10px",
    justifyContent: "space-between",
    alignItems: "center",
}));

export const FooterLinks = styled(Box)({
    display: "flex",
    gap: "10px",
    justifyContent: "center",
});

export const SocialLinkIcons = styled("a")(({ theme }) => ({
    fontSize: "1rem",
    color: theme.palette.text.primary,
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
}));
