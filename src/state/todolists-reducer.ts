// import {FilterValuesType, TodoListType} from "../App";
// import {v1} from "uuid";
//
//
// export type RemoveTodoListActionType = {
//     type: 'REMOVE-TODOLIST'
//     id: string
// }
// export type AddTodoListActionType = {
//     type: 'ADD-TODOLIST'
//     title: string
//     todolistId: string
// }
// type ChangeTodoListTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE'
//     id: string
//     title: string
// }
// type ChangeTodoListFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER'
//     id: string
//     filter: FilterValuesType
// }
//
// type ActionsType = RemoveTodoListActionType |
//     AddTodoListActionType | ChangeTodoListTitleActionType |
//     ChangeTodoListFilterActionType
//
// // export let todoListId1 = v1();
// // export let todoListId2 = v1();
//
// const initialState: Array<TodoListType> = [
//     // {id: todoListId1, title: "What to learn", filter: "all"},
//     // {id: todoListId2, title: "What to buy", filter: "all"}
// ]
//
// export const todolistsReducer = (
//     state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST': {
//             return state.filter(tl => tl.id !== action.id)
//         }
//         case 'ADD-TODOLIST': {
//             return [{id: action.todolistId, title: action.title, filter: "all"}, ...state]
//         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             const todoList = state.find(tl => tl.id === action.id)
//             if (todoList) {
//                 todoList.title = action.title;
//             }
//             return [...state]
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             const todoList = state.find(tl => tl.id === action.id)
//             if (todoList) {
//                 todoList.filter = action.filter;
//             }
//             return [...state]
//         }
//
//         default:
//             return state;
//     }
// }
// export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
//     return { type: 'REMOVE-TODOLIST', id: todolistId}
// }
// export const AddTodoListAC = (title: string): AddTodoListActionType => {
//     return { type: 'ADD-TODOLIST', title, todolistId: v1()}
// }
// export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
//     return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
// }
// export const ChangeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
//     return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
// }
import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: Array<TodolistType> =  []

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

