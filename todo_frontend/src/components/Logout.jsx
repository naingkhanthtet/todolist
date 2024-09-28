import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        (async () => {
            try {
                const { data } = await axios.post(
                    "/logout/",
                    {
                        refresh_token: localStorage.getItem("refresh_token"),
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    { withCredentials: true }
                );

                console.log("logout", data);
                localStorage.clear();
                axios.defaults.headers.common["Authorization"] = null;
                navigate("/login");
            } catch (e) {
                console.log("logout not working");
            }
        })();
    };

    return (
        <div>
            <p onClick={handleLogout}>Logout</p>
        </div>
    );
};

export default Logout;
