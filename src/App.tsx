import React from 'react';
import './App.css';
import Todolist from "./Components/Todolist/todolist";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    return (
        <div className="App">
            <Todolist/>
        </div>
    );
}

export default App;
