import React from "react";
import s from "./button.module.css"

const Button = (props: any) => {

    return (
        <input className={s.button}
               type="button"
        value={props.value}/>
    )
}

export default Button;