import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from "../../Common/Button/button";
import s from "./header.module.css";

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
        <div className={s.header}>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                {/*<button onClick={addTask}>+</button>*/}
                <Button text="Add" type="info"/>
            </div>
        </div>
    )
}