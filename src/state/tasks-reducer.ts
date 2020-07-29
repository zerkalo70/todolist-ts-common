// import {FilterValuesType, TasksStateType, TodoListType} from "../App";
// import {v1} from "uuid";
// import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";
//
//
// type RemoveTaskActionType = {
//     type: 'REMOVE-TASK'
//     todolistId: string
//     taskId: string
// }
// type AddTaskActionType = {
//     type: 'ADD-TASK'
//     title: string
//     todolistId: string
// }
// type ChangeTaskStatusActionType = {
//     type: 'CHANGE-TASK-STATUS'
//     taskId: string
//     todolistId: string
//     isDone: boolean
// }
// type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE'
//     taskId: string
//     todolistId: string
//     title: string
// }
//
// type ActionsType = RemoveTaskActionType |
//     AddTaskActionType |
//     ChangeTaskStatusActionType |
//     ChangeTaskTitleActionType |
//     AddTodoListActionType |
//     RemoveTodoListActionType;
//
// const initialState: TasksStateType = {
//     count: []
//     // [todoListId1]: [
//     //     {id: v1(), title: "HTML&CSS", isDone: true},
//     //     {id: v1(), title: "JS", isDone: true},
//     //     {id: v1(), title: "ReactJS", isDone: false},
//     //     {id: v1(), title: "Rest API", isDone: false},
//     //     {id: v1(), title: "GraphQL", isDone: false}],
//     // [todoListId2]: [
//     //     {id: v1(), title: "Book", isDone: true},
//     //     {id: v1(), title: "Milk", isDone: true}]
// }
//
// export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):
//     TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             const stateCopy = {...state};
//             const tasks = stateCopy[action.todolistId];
//             const filteredTasks = tasks.filter(t => t.id !== action.taskId)
//             stateCopy[action.todolistId] = filteredTasks;
//             return stateCopy;
//         }
//         case 'ADD-TASK': {
//             const stateCopy = {...state};
//             const tasks = state[action.todolistId];
//             const newTask = {id: v1(), title: action.title, isDone: false};
//             const newTasks = [newTask, ...tasks];
//             stateCopy[action.todolistId] = newTasks;
//             return stateCopy;
//         }
//         case "CHANGE-TASK-STATUS": {
//             let todolistTasks = state[action.todolistId];
//             state[action.todolistId] = todolistTasks
//                 .map(t => t.id === action.taskId
//                 ? {...t, isDone: action.isDone}
//                 : t);
//             return ({...state})
//             // const stateCopy = {...state};
//             // let tasksObj = stateCopy[action.todolistId]
//             // let task = tasksObj.find(t => t.id === action.taskId)
//             // if (task) {
//             //     task.isDone = action.isDone;
//             // }
//             // return stateCopy;
//         }
//         case "CHANGE-TASK-TITLE": {
//             let todolistTasks = state[action.todolistId];
//             state[action.todolistId] = todolistTasks
//                 .map(t => t.id === action.taskId
//                     ? {...t, title: action.title}
//                     : t);
//             return ({...state})
//             // const stateCopy = {...state};
//             // let tasksObj = stateCopy[action.todolistId]
//             // let task = tasksObj.find(t => t.id === action.taskId)
//             // if (task) {
//             //     task.title = action.title;
//             // }
//             // return stateCopy;
//         }
//         case "ADD-TODOLIST": {
//             const stateCopy = {...state};
//             stateCopy[action.todolistId] = [];
//             return stateCopy;
//         }
//         case "REMOVE-TODOLIST": {
//             const stateCopy = {...state};
//             delete stateCopy[action.id];
//             return stateCopy;
//         }
//         default:
//             return state;
//     }
// }
// export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
//     return { type: 'REMOVE-TASK', todolistId, taskId}
// }
// export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
//     return { type: 'ADD-TASK', title, todolistId}
// }
// export const changeTaskStatusAC = (taskId: string,
//                                    isDone: boolean,
//                                    todolistId: string): ChangeTaskStatusActionType => {
//     return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
// }
// export const changeTaskTitleAC = (taskId: string,
//                                    title: string,
//                                    todolistId: string): ChangeTaskTitleActionType => {
//     return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
// }
import {TasksStateType} from '../App';
import {TaskType} from '../Todolist';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {
    count: []
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}


