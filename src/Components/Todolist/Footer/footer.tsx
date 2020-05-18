import React from "react";
import {FilterValuesType} from "../../../App";


type PropsType = {
    changeFilter: (value: FilterValuesType) => void
}


export function Footer(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return (
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    )
}