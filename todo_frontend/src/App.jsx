// import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Nav from "./components/Nav";
import ToDoPage from "./components/ToDoPage";
import Logout from "./components/Logout";
import useTheme from "./useTheme";
import useToken from "./useToken";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
    const { isDarkMode, toggleTheme, theme } = useTheme();
    const { token, setToken } = useToken();
    return (
        <div className="App">
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Nav toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                    <Routes>
                        <Route path="/register" element={<Register />} />
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
                        <Route
                            path="*"
                            element={
                                token ? <ToDoPage /> : <Navigate to="/login" />
                            }
                        />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </ThemeProvider>
            </Router>
        </div>
    );
}

export default App;
