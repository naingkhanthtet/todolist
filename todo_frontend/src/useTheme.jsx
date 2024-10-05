import { useState, useEffect } from "react";
import { createTheme } from "@mui/material/styles";

const useTheme = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    const toggleTheme = () => {
        const newTheme = !isDarkMode ? "dark" : "light";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("theme", newTheme);
    };

    const theme = createTheme({
        typography: {
            fontFamily: "Lora, Arial, sans-serif", // Add your desired font here
        },
        palette: {
            mode: isDarkMode ? "dark" : "light",
        },
    });

    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    return { isDarkMode, toggleTheme, theme };
};

export default useTheme;
