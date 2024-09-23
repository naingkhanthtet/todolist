import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

export default function ToDoPage() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [clickedDeleteId, setClickedDeleteId] = useState(null);
    const [deleteTimeoutId, setDeleteTimeoutId] = useState(null);

    useEffect(() => {
        axios
            .get("/tasks/")
            .then((res) => {
                setTasks(res.data);
            })
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    const addTask = () => {
        if (newTaskTitle.trim() === "") return;
        axios
            .post("/tasks/", { title: newTaskTitle, completed: false })
            .then((res) => {
                setTasks([...tasks, res.data]);
                setNewTaskTitle("");
            })
            .catch((err) => console.error("Error creating task:", err));
    };

    const handleTitleChange = (event, task) => {
        const updatedTitle = event.target.value;
        const updatedTask = { ...task, title: updatedTitle };
        setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    };

    const handleKeyPress = (event, task) => {
        if (event.key === "Enter") {
            updateTask(task);
        }
    };

    const updateTask = (task) => {
        axios
            .put(`/tasks/${task.id}/`, {
                title: task.title,
                completed: task.completed,
            })
            .then((res) => {
                setTasks(tasks.map((t) => (t.id === task.id ? res.data : t)));
            })
            .catch((err) => console.error("Error updating task:", err));
    };

    const deleteTask = (id) => {
        if (clickedDeleteId === id) {
            clearTimeout(deleteTimeoutId);
            setClickedDeleteId(null);
            setDeleteTimeoutId(null);
        } else {
            setClickedDeleteId(id);
            const timeoutId = setTimeout(() => {
                axios
                    .delete(`/tasks/${id}/`)
                    .then(() => {
                        setTasks(tasks.filter((task) => task.id !== id));
                        setClickedDeleteId(null);
                        setDeleteTimeoutId(null);
                    })
                    .catch((err) => console.error("Error deleting task:", err));
            }, 2000);
            setDeleteTimeoutId(timeoutId);
        }
    };

    return (
        <div className="todo-list">
            {tasks.map((task) => (
                <span key={task.id} className="task-item">
                    {/* Task title */}
                    {/* <span className="task-title"> */}
                    <input
                        className="task-title"
                        type="text"
                        value={task.title}
                        onChange={(e) => handleTitleChange(e, task)}
                        onKeyDown={(e) => handleKeyPress(e, task)}
                        onBlur={() => updateTask(task)}
                    />
                    {/* </span> */}

                    {/* Delete button */}
                    <span
                        className="complete-icon"
                        onClick={() => deleteTask(task.id)}
                    >
                        {clickedDeleteId === task.id ? (
                            <FaRegCircleCheck />
                        ) : (
                            <FaRegCircle />
                        )}
                    </span>
                </span>
            ))}

            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add new task"
            />
            {/* <button onClick={addTask}>Add task</button> */}
            <FaPlus className="add-icon" onClick={addTask} />
        </div>
    );
}
