import React from "react";

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
        <div>
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
                                <button onClick={onRemoveHandler}>x</button>
                            </li>)
                    })
                }
            </ul>
        </div>
    )
}

