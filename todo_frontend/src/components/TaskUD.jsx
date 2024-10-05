import React, { useEffect, useState } from "react";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import axiosInstance from "../interceptor/axiosInstance";
import { StyledIcons, StyledTextarea } from "./styles/StyledComponents";
import { StyledBox } from "./styles/StyledComponents";
// import Textarea from "@mui/joy/Textarea";

const TaskUD = ({ tasks, setTasks }) => {
    const [taskEdits, setTaskEdits] = useState(() => {
        return JSON.parse(localStorage.getItem("taskEdits")) || {};
    });
    const [clickedDeleteIds, setClickedDeleteIds] = useState([]);
    const [deleteTimeoutIds, setDeleteTimeoutIds] = useState({});

    // store tasks on Local storage when the value changes
    useEffect(() => {
        localStorage.setItem("taskEdits", JSON.stringify(taskEdits));
    }, [taskEdits]);

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
        <>
            {tasks.map((task) => (
                <StyledBox key={task.id}>
                    {/* Task title */}
                    <StyledTextarea
                        className="task-title"
                        value={taskEdits[task.id] || task.title} // title from localstorage or from backend
                        onChange={(e) => {
                            handleTaskEdits(e, task);
                        }}
                        onKeyDown={(e) => e.key === "Enter" && updateTask(task)}
                        onBlur={() => updateTask(task)}
                        maxLength={100}
                    />
                    {/* <Textarea value={taskEdits[task.id] || task.title} /> */}

                    {/* Delete button */}
                    <StyledIcons
                        onClick={() => deleteTask(task.id)}
                        sx={{ fontSize: "1.5rem" }}
                    >
                        {clickedDeleteIds.includes(task.id) ? (
                            <FaRegCircleCheck />
                        ) : (
                            <FaRegCircle />
                        )}
                    </StyledIcons>
                </StyledBox>
            ))}
        </>
    );
};

export default TaskUD;
