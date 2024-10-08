import React, { useState } from "react";
import DOMPurify from "dompurify";
import axiosInstance from "../interceptor/axiosInstance";
import { FaPlus } from "react-icons/fa6";
import {
    StyledBox,
    StyledIcons,
    StyledTextarea,
} from "./styles/StyledComponents";

const TaskAdd = ({ handleAddTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

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
                handleAddTask(newTask);
                setNewTaskTitle("");
            } else {
                console.log("Cannot add now");
            }
        } catch (err) {
            console.log("Server error! cannot add now", err);
        }
    };

    return (
        <StyledBox>
            <StyledTextarea
                className="new-title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add new task here"
                variant="standard"
                multiline
                inputProps={{ maxLength: 100 }}
            />
            {/* Add button */}
            <StyledIcons onClick={addTask} sx={{ fontSize: "1.5rem" }}>
                <FaPlus />
            </StyledIcons>
        </StyledBox>
    );
};

export default TaskAdd;
