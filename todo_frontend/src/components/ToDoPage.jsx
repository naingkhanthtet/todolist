import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

const ToDoPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [taskEdits, setTaskEdits] = useState(() => {
        return JSON.parse(localStorage.getItem("taskEdits")) || {};
    });
    const [clickedDeleteIds, setClickedDeleteIds] = useState([]);
    const [deleteTimeoutIds, setDeleteTimeoutIds] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("access_token") === null) {
            navigate("/login");
        } else {
            (async () => {
                try {
                    const { data } = await axios.get("/tasks/", {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    });

                    setTasks(data);
                } catch (err) {
                    console.error("error fetching", err);
                    navigate("/login");
                }
            })();
        }
    }, []);

    // store tasks on Local storage when the value changes
    useEffect(() => {
        localStorage.setItem("taskEdits", JSON.stringify(taskEdits));
    }, [taskEdits]);

    // add task to database and set tasks value
    const addTask = () => {
        if (newTaskTitle.trim() === "") return;
        axios
            .post("/tasks/", { title: newTaskTitle, completed: false })
            .then((res) => {
                setTasks([...tasks, res.data]);
                setNewTaskTitle(""); // reset input form after adding task
            })
            .catch((err) => console.error("Error creating task:", err));
    };

    // store edited task
    const handleTaskEdits = (event, task) => {
        const editedTaskTitle = event.target.value;
        setTaskEdits({ ...taskEdits, [task.id]: editedTaskTitle });
    };

    // send PUT request with updated task
    const updateTask = (task) => {
        const editedTaskTitle = taskEdits[task.id] || task.title;
        axios
            .put(`/tasks/${task.id}/`, {
                title: editedTaskTitle,
                completed: task.completed,
            })
            .then((res) => {
                setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
                setTaskEdits((prevEdits) => {
                    // remove the edited task
                    const { [task.id]: _, ...rest } = prevEdits;
                    return rest;
                });
            })
            .catch((err) => console.error("Error updating task:", err));
    };

    const deleteTask = (id) => {
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
            const timeoutId = setTimeout(() => {
                axios
                    .delete(`/tasks/${id}/`)
                    .then(() => {
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
                    })
                    .catch((err) => console.error("Error deleting task:", err));
            }, 2000);
            setDeleteTimeoutIds((prev) => ({ ...prev, [id]: timeoutId }));
        }
    };

    return (
        <div className="todo-list">
            {tasks.map((task) => (
                <span className="task-item" key={task.id}>
                    {/* Task title */}
                    <input
                        className="task-title"
                        type="text"
                        value={taskEdits[task.id] || task.title} // title from localstorage or from backend
                        onChange={(e) => handleTaskEdits(e, task)}
                        onKeyDown={(e) => e.key === "Enter" && updateTask(task)}
                        onBlur={() => updateTask(task)}
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
            ))}

            <span className="new-task">
                {/* New Task input */}
                <input
                    className="new-title"
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTask()}
                    placeholder="Add new task"
                />
                {/* Add button */}
                <FaPlus className="add-icon" onClick={addTask} />
            </span>
        </div>
    );
};

export default ToDoPage;
