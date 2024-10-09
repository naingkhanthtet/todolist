import { createContext, useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    // Toggle theme between dark and light
    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("theme", newTheme);
    };

    const theme = createTheme({
        typography: {
            fontFamily: "Lora, sans-serif",
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

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => useContext(ThemeContext);
