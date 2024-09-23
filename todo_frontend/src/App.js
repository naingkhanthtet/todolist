import "./App.css";
import Nav from "./components/Nav";
import ToDoPage from "./components/ToDoPage";
// import { useState } from "react";

function App() {
    return (
        <div className="App">
            <Nav />
            <ToDoPage />
        </div>
    );
}

export default App;
