import React from "react";
import {
    StyledFooter,
    FooterLinks,
    SocialLinkIcons,
    StyledFooterSection,
} from "./styles/StyledFooterComponents";
import { Box } from "@mui/material";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <StyledFooterSection>
            <StyledFooter>
                <Box>built by naingkhanthtet</Box>
                <FooterLinks>
                    <SocialLinkIcons href="https://github.com/naingkhanthtet/todolist">
                        <FaGithub />
                    </SocialLinkIcons>
                    <SocialLinkIcons href="https://www.linkedin.com/in/naing-khant-htet-446311227/">
                        <FaLinkedin />
                    </SocialLinkIcons>
                </FooterLinks>
            </StyledFooter>
        </StyledFooterSection>
    );
};

export default Footer;
