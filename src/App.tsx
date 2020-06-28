import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function changeTaskStatus(id: string, isDone: boolean, todoListId: string) {
        let task = tasksObj[todoListId].find(t => t.id === id)
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        let task = tasksObj[todoListId].find(t => t.id === id)
        if (task) {
            task.title = newTitle;
            setTasksObj({...tasksObj});
        }
    }

    function removeTask(id: string, todoListId: string) {
        let tasks = tasksObj[todoListId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todoListId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListId];
        let newTasks = [task, ...tasks];
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todoLists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ]);

    let removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId);
        setTodoLists(filteredTodoList);
        delete tasksObj[todoListId];
        setTasksObj({...tasksObj});
    };

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true}]
    });

    function changeTodoListTitle(id: string, newTitle: string) {
const todoList = todoLists.find(tl => tl.id === id)
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    function addTodoList(title: string) {
        let todoList: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title
        };
        setTodoLists([todoList, ...todoLists]);
        setTasksObj({...tasksObj, [todoList.id]: []});
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }
                    return <Todolist
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
                })
            }
        </div>
    );
}


export default App;
