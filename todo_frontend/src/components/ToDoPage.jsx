import React, { useEffect, useState } from "react";
// import "./styles/ToDoPage.css";
import { FaCircleXmark } from "react-icons/fa6";
import axiosInstance from "../interceptor/axiosInstance";
import TaskUD from "./TaskUD";
import TaskAdd from "./TaskAdd";

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
            {error ? (
                <div className="task-item">
                    <span className="error-task">
                        Error loading tasks, try refreshing the browser
                    </span>
                    <span className="cross-icon">
                        <FaCircleXmark />
                    </span>
                </div>
            ) : tasks.length > 0 ? (
                <div>
                    <TaskUD tasks={tasks} setTasks={setTasks} />
                </div>
            ) : (
                <div className="task-item">
                    <span className="error-task">
                        No task created, add one now
                    </span>
                </div>
            )}
            <TaskAdd handleAddTask={handleAddTask} />
        </div>
    );
};

export default ToDoPage;

/*
) : (
    <div className="task-item">
        <span className="error-task">
            No task created, add one now
        </span>
    </div>
)
    */
