import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
type ActionsType = RemoveTodoListActionType |
    AddTodoListActionType | ChangeTodoListTitleActionType |
    ChangeTodoListFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(),title: action.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }

        default:
            throw new Error("I don't understand this type !!!")
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return { type: 'ADD-TODOLIST', title: title}
}
export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

