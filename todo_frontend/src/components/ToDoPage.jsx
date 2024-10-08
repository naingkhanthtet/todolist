import React, { useEffect, useState } from "react";
import { FaCircleXmark } from "react-icons/fa6";
import axiosInstance from "../interceptor/axiosInstance";
import TaskUD from "./TaskUD";
import TaskAdd from "./TaskAdd";
import Box from "@mui/joy/Box";
import { StyledBox, StyledIcons } from "./styles/StyledComponents";

const ToDoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(false);
    const token = localStorage.getItem("access_token");

    // fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get("/tasks/");
                setTasks(res.data);
            } catch (err) {
                setError(true);
                console.log(err);
            }
        };
        fetchTasks();
    }, [token]);

    const handleAddTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    return (
        <div className="todo-list">
            {/* Error handling */}
            {error ? (
                <StyledBox>
                    <Box sx={{ padding: "10px" }}>
                        Error loading tasks, try refreshing the browser
                    </Box>
                    <StyledIcons sx={{ fontSize: "1.5rem" }}>
                        <FaCircleXmark />
                    </StyledIcons>
                </StyledBox>
            ) : tasks.length > 0 ? (
                // Display Tasks if tasks are fetched
                <TaskUD tasks={tasks} setTasks={setTasks} />
            ) : (
                <StyledBox>
                    {/* If no task is created */}
                    <Box sx={{ padding: "10px" }}>
                        No task created, add one now
                    </Box>
                </StyledBox>
            )}
            <TaskAdd handleAddTask={handleAddTask} />
        </div>
    );
};

export default ToDoPage;
