import axios from "axios";

export const addTask = (tasks, setTasks, newTaskTitle, setNewTaskTitle) => {
    if (newTaskTitle.trim() === "") return;
    axios
        .post("/tasks/", { title: newTaskTitle, completed: false })
        .then((res) => {
            setTasks([...tasks, res.data]);
            setNewTaskTitle("");
        })
        .catch((err) => console.error("Error creating task:", err));
};

export const handleTaskEdits = (event, task, taskEdits, setTaskEdits) => {
    const editedTaskTitle = event.target.value;
    setTaskEdits({ ...taskEdits, [task.id]: editedTaskTitle });
};

export const updateTask = (task, tasks, setTasks, taskEdits, setTaskEdits) => {
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

export const deleteTask = (
    id,
    setTasks,
    clickedDeleteIds,
    setClickedDeleteIds,
    deleteTimeoutIds,
    setDeleteTimeoutIds
) => {
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
