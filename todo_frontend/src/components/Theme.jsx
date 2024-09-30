import React, { useEffect, useState } from "react";
import "../App.css";

const Theme = () => {
    // const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem("isDarkMode") === "true";
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
        localStorage.setItem("isDarkMode", isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button onClick={toggleTheme}>{isDarkMode ? "Light" : "Dark"}</button>
    );
};

export default Theme;
