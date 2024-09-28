import "./App.css";
import Nav from "./components/Nav";
import ToDoPage from "./components/ToDoPage";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";

function App() {
    const [token, setToken] = useState(
        localStorage.getItem("access_token") || ""
    );

    useEffect(() => {
        if (token) {
            localStorage.setItem("access_token", token);
        } else {
            localStorage.removeItem("access_token");
        }
    }, [token]);

    return (
        <div className="App">
            <Router>
                <div>
                    <Nav />
                    <Routes>
                        <Route
                            path="/register"
                            element={<Register setToken={setToken} />}
                        />
                        <Route
                            path="/login"
                            element={<Login setToken={setToken} />}
                        />
                        <Route
                            path="/home"
                            element={
                                token ? <ToDoPage /> : <Navigate to="/login" />
                            }
                        />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
