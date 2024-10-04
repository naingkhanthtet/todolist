import { useState, useEffect } from "react";

const useToken = () => {
    const [token, setToken] = useState(
        localStorage.getItem("access_token") || ""
    );

    useEffect(() => {
        if (!token) {
            localStorage.removeItem("access_token");
        }
    }, [token]);
    return { token, setToken };
};

export default useToken;
