import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };
    const addTask = () => {
        let trimedTitle = title.trim();
        if (trimedTitle) {
            props.addItem(trimedTitle);
        } else {
            setError("Введите задание");
        }
        setTitle("");
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Type value'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addTask}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}