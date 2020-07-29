// import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import {IconButton, TextField} from "@material-ui/core";
// import {ControlPoint} from "@material-ui/icons";
//
// type AddItemFormPropsType = {
//     addItem: (title: string) => void
// }
//
// export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
// console.log("AddItemForm is called");
//     let [title, setTitle] = useState("");
//     let [error, setError] = useState<string | null>(null);
//     const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setTitle(e.currentTarget.value);
//         setError(null);
//     };
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         if (error !== null) {
//             setError(null)
//         }
//         if (e.charCode === 13) {
//             addTask();
//         }
//     };
//     const addTask = () => {
//         let trimedTitle = title.trim();
//         if (trimedTitle) {
//             props.addItem(trimedTitle);
//         } else {
//             setError("Введите задание");
//         }
//         setTitle("");
//     }
//
//     return (
//         <div>
//             <TextField
//                 variant={'outlined'}
//                 label={'Type value'}
//                 value={title}
//                 onChange={onChangeHandler}
//                 onKeyPress={onKeyPressHandler}
//                 error={!!error}
//                 helperText={error}
//             />
//             <IconButton color={'primary'} onClick={addTask}>
//                 <ControlPoint/>
//             </IconButton>
//         </div>
//     )
// });
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Box, Button, FormControl, IconButton, TextField} from '@material-ui/core';
import {AddBox} from '@material-ui/icons';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo( (props: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
} );