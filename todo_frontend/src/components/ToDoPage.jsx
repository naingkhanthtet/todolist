import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

export default function ToDoPage() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");
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

    const handleEditClick = (task) => {
        setEditingTaskId(task.id);
        setEditingTitle(task.title);
    };

    const handleKeyPress = (event, task) => {
        if (event.key === "Enter") {
            axios
                .put(`/tasks/${task.id}/`, {
                    title: editingTitle,
                    completed: task.completed,
                })
                .then((res) => {
                    const updatedTask = tasks.map((t) =>
                        t.id === task.id ? res.data : t
                    );
                    setTasks(updatedTask);
                    setEditingTaskId(null);
                })
                .catch((err) => console.error("Error updating task:", err));
        }
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
                    })
                    .catch((err) => console.error("Error deleting task:", err));
            }, 2000);
            setDeleteTimeoutId(timeoutId);
        }
    };

    return (
        <div className="todo-list">
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">
                        {/* Task title */}
                        <span className="task-title">
                            {editingTaskId === task.id ? (
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) =>
                                        setEditingTitle(e.target.value)
                                    }
                                    onKeyDown={(e) => handleKeyPress(e, task)}
                                />
                            ) : (
                                <span onClick={() => handleEditClick(task)}>
                                    {task.title}
                                </span>
                            )}
                        </span>

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
                    </li>
                ))}
            </ul>

            <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add new task"
            />
            {/* <button onClick={addTask}>Add task</button> */}
            <FaPlusCircle className="add-icon" onClick={addTask} />
        </div>
    );
}
