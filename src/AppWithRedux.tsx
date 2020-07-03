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
    todolistsReducer} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType,
        Array<TodoListType>>(state => state.todolists);
    const tasksObj = useSelector<AppRootStateType,
        TasksStateType>(state => state.tasks);

    function removeTask(id: string, todoListId: string) {
        /*const action = removeTaskAC(id, todoListId);
        dispatchToTasksReducer(action);*/
        dispatch(removeTaskAC(id, todoListId));
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId);
        dispatch(action);
    }

    function changeTaskStatus(
        id: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(id, isDone, todoListId);
        dispatch(action);
    }

    function changeTaskTitle(
        id: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(id, newTitle, todoListId);
        dispatch(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const action = ChangeTodoListTitleAC(id, newTitle);
        dispatch(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = ChangeTodoListFilterAC(value, todolistId);
        dispatch(action);
    }

    let removeTodoList = (todoListId: string) => {
        const action = RemoveTodolistAC(todoListId);
        dispatch(action);
    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title);
        dispatch(action);
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


export default AppWithRedux;
