import React from "react";
import {FilterValuesType} from "../../../App";
import Button from "../../Common/Button/button";


type PropsType = {
    changeFilter: (value: FilterValuesType) => void

}


export function Footer(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return (
        <div className="footer">
            {/*<button onClick={onAllClickHandler}>All</button>*/}
            <Button text="All" type="info"/>
            {/*<button onClick={onActiveClickHandler}>Active</button>*/}
            <Button text="Completed" type="danger"/>
            {/*<button onClick={onCompletedClickHandler}>Completed</button>*/}
            <Button text="Active" type="success"/>
        </div>
    )
}