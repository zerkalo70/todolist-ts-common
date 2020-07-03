import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    AppBar, Button, Container, Grid,
    IconButton, Paper, Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true}]
    })

    function removeTask(id: string, todoListId: string) {
        /*const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action);*/
        dispatchToTasksReducer(removeTaskAC(id, todoListId));
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId);
        dispatchToTasksReducer(action);
    }

    function changeTaskStatus(
        id: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(id, isDone, todoListId);
        dispatchToTasksReducer(action);
    }

    function changeTaskTitle(
        id: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListId);
        dispatchToTasksReducer(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = ChangeTodoListTitleAC(id, newTitle);
        dispatchToTodolistsReducer(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodoListFilterAC(value, todolistId);
        dispatchToTodolistsReducer(action);
    }

    let removeTodoList = (todoListId: string) => {
        const action = RemoveTodolistAC(todoListId);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title);
        dispatchToTodolistsReducer(action);
        dispatchToTasksReducer(action);
    }

    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={10}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodolist = tasksObj[tl.id];

                            if (tl.filter === "active") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                            }
                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeTaskStatus}
                                        changeTaskTitle={changeTaskTitle}
                                        addTask={addTask}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}/>
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}


export default AppWithReducers;
