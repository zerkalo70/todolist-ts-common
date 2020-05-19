import React from "react";
import Button from "../../Common/Button/button";
import s from "./list.module.css";

type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    tasks: Array<TasksType>
    removeTask: (taskId: string) => void
}

export function List(props: PropsType) {

    return (
        <div className={s.list}>
            <ul>
                {
                    props.tasks.map(t => {

                        const onRemoveHandler = () => {
                            props.removeTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                {/*<button onClick={onRemoveHandler}>x</button>*/}
                                <Button text="Delit" type="danger"/>
                            </li>)
                    })
                }
            </ul>
        </div>
    )
}

