import React, { useEffect, useState } from "react";
// import "./styles/ToDoPage.css";
import DOMPurify from "dompurify";
import {
    FaPlus,
    FaRegCircle,
    FaRegCircleCheck,
    FaCircleXmark,
} from "react-icons/fa6";
import axiosInstance from "../interceptor/axiosInstance";

const ToDoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [taskEdits, setTaskEdits] = useState(() => {
        return JSON.parse(localStorage.getItem("taskEdits")) || {};
    });
    const [clickedDeleteIds, setClickedDeleteIds] = useState([]);
    const [deleteTimeoutIds, setDeleteTimeoutIds] = useState({});
    const [error, setError] = useState(false);
    const token = localStorage.getItem("access_token");

    // fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get("/tasks/");
                setTasks(res.data);
                setError(false);
            } catch (err) {
                setError(true);
                console.log(err);
            }
        };
        fetchTasks();
    }, [token]);

    // store tasks on Local storage when the value changes
    useEffect(() => {
        localStorage.setItem("taskEdits", JSON.stringify(taskEdits));
    }, [taskEdits]);

    // add task to database and set tasks value
    const addTask = async () => {
        const purifiedNewTask = DOMPurify.sanitize(newTaskTitle);
        if (purifiedNewTask.trim() === "") {
            alert("Please add valid task title");
            return;
        }
        try {
            const res = await axiosInstance.post("/tasks/", {
                title: purifiedNewTask,
                completed: false,
            });
            if (res.status >= 200 && res.status <= 300) {
                const newTask = res.data;
                setTasks([...tasks, newTask]);
                setNewTaskTitle("");
            } else {
                console.log("Cannot add now");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // store edited task
    const handleTaskEdits = (event, task) => {
        const editedTaskTitle = event.target.value;
        setTaskEdits({ ...taskEdits, [task.id]: editedTaskTitle });
    };

    // send PUT request with updated task
    const updateTask = async (task) => {
        const editedTaskTitle = taskEdits[task.id] || task.title;
        try {
            const res = await axiosInstance.put(`/tasks/${task.id}/`, {
                title: editedTaskTitle,
                completed: task.completed,
            });
            if (res.status >= 200 && res.status <= 300) {
                const editedTask = res.data;
                setTasks(tasks.map((t) => (t.id === task.id ? editedTask : t)));
                setTaskEdits((prevEdits) => {
                    // remove the edited task
                    const { [task.id]: _, ...rest } = prevEdits;
                    return rest;
                });
            } else {
                console.log("Cannot add now");
            }
        } catch (err) {
            console.log("Error updating task", err);
        }
    };

    // delete task
    const deleteTask = async (id) => {
        if (clickedDeleteIds.includes(id)) {
            clearTimeout(deleteTimeoutIds[id]);
            setClickedDeleteIds(
                clickedDeleteIds.filter((deletedId) => deletedId !== id)
            );
            setDeleteTimeoutIds((prev) => {
                const updatedTimeouts = { ...prev };
                delete updatedTimeouts[id];
                return updatedTimeouts;
            });
        } else {
            setClickedDeleteIds([...clickedDeleteIds, id]);
            const timeoutId = setTimeout(async () => {
                try {
                    const res = await axiosInstance.delete(`/tasks/${id}/`);
                    if (res.status >= 200 && res.status <= 300) {
                        setTasks((prevTasks) =>
                            prevTasks.filter((task) => task.id !== id)
                        );
                        setClickedDeleteIds((prev) =>
                            prev.filter((deletedId) => deletedId !== id)
                        );
                        setDeleteTimeoutIds((prev) => {
                            const updatedTimeouts = { ...prev };
                            delete updatedTimeouts[id];
                            return updatedTimeouts;
                        });
                    } else {
                        alert(`Cannot delete ${id} now`);
                    }
                } catch (err) {
                    console.log("error deleting task", err);
                }
            }, 2000);
            setDeleteTimeoutIds((prev) => ({ ...prev, [id]: timeoutId }));
        }
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
            ) : tasks && tasks.length > 0 ? (
                tasks.map((task) => (
                    <span className="task-item" key={task.id}>
                        {/* Task title */}
                        <textarea
                            className="task-title"
                            type="text"
                            value={taskEdits[task.id] || task.title} // title from localstorage or from backend
                            onChange={(e) => {
                                handleTaskEdits(e, task);
                            }}
                            onKeyDown={(e) =>
                                e.key === "Enter" && updateTask(task)
                            }
                            onBlur={() => updateTask(task)}
                            maxLength={100}
                        />

                        {/* Delete button */}
                        <span
                            className="complete-icon"
                            onClick={() => deleteTask(task.id)}
                        >
                            {clickedDeleteIds.includes(task.id) ? (
                                <FaRegCircleCheck />
                            ) : (
                                <FaRegCircle />
                            )}
                        </span>
                    </span>
                ))
            ) : (
                <div className="task-item">
                    <span className="error-task">
                        No task created, add one now
                    </span>
                </div>
            )}

            <span className="new-task">
                {/* New Task input */}
                <textarea
                    className="new-title"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => {
                        setNewTaskTitle(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    rows={1}
                    placeholder="Add new task here"
                    maxLength={100}
                />
                {/* Add button */}
                <span className="add-icon" onClick={addTask}>
                    <FaPlus />
                </span>
            </span>
        </div>
    );
};

export default ToDoPage;
