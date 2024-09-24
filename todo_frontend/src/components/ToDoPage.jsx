import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";

export default function ToDoPage() {
    const [tasks, setTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [taskEdits, setTaskEdits] = useState({});
    const [clickedDeleteIds, setClickedDeleteIds] = useState([]);
    const [deleteTimeoutIds, setDeleteTimeoutIds] = useState({});

    useEffect(() => {
        const storedEdits = JSON.parse(localStorage.getItem("taskEdits")) || {};
        axios
            .get("/tasks/")
            .then((res) => {
                const fetchedTasks = res.data;
                const mergedTasks = fetchedTasks.map((task) => {
                    if (storedEdits[task.id]) {
                        return { ...task, title: storedEdits[task.id] };
                    }
                    return task;
                });

                setTasks(mergedTasks);
            })
            .catch((err) => console.error("Error fetching tasks:", err));
    }, []);

    useEffect(() => {
        localStorage.setItem("taskEdits", JSON.stringify(taskEdits));
    }, [taskEdits]);

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

    // const handleTitleChange = (event, task) => {
    //     const updatedTitle = event.target.value;
    //     const updatedTask = { ...task, title: updatedTitle };
    //     setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    // };

    const handleTaskEdits = (event, taskId) => {
        const editedTaskTitle = event.target.value;
        setTaskEdits({ ...taskEdits, [taskId]: editedTaskTitle });
    };

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
                        setTasks(tasks.filter((task) => task.id !== id));
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
                        value={taskEdits[task.id] || task.title}
                        onChange={(e) => handleTaskEdits(e, task.id)}
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
}
