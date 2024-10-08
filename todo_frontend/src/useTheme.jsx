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
            fontFamily: "Lora, Arial, sans-serif",
        },
        palette: {
            mode: isDarkMode ? "dark" : "light",
            ...(isDarkMode
                ? {}
                : {
                      primary: {
                          main: "#000000",
                      },
                      text: {
                          primary: "#000000",
                      },
                      background: {
                          default: "#eee2cb",
                          paper: "#eee2cb",
                      },
                  }),
        },
    });

    useEffect(() => {
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    return { isDarkMode, toggleTheme, theme };
};

export default useTheme;
