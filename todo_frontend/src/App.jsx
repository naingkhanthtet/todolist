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
import useToken from "./useToken";
import Footer from "./components/Footer";
import Settings from "./components/Settings";

function App() {
    const { token, setToken } = useToken();

    return (
        <div className="App">
            <Router>
                <Nav />
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
                    <Route
                        path="/settings"
                        element={
                            token ? <Settings /> : <Navigate to="/login" />
                        }
                    />
                    <Route path="/logout" element={<Logout />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
