import React, {useState} from 'react';
import s from './todolist.module.css'
import {List} from "./List/list";
import {v1} from 'uuid';
import {Footer} from "./Footer/footer";
import {Header} from "./Header/header";

export type FilterValuesType = "all" | "active" | "completed";

function Todolist() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;
    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }


    return (
        <div className={s.todolist}>
            <Header title="What to learn"
                    tasks={tasksForTodolist}
                    addTask={addTask}/>
            <List tasks={tasksForTodolist}
                  removeTask={removeTask}/>
            <Footer changeFilter={changeFilter}/>
        </div>
    );
}

export default Todolist;
