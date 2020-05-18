import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    addTask: (title: string) => void
}

export function Header(props: PropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("");

    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
        </div>
    )
}