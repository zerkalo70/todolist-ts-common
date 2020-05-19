import React from "react";
import s from "./button.module.css";
import cn from "classnames";

type PropsType = {
    text: string
    type?: "default"|"danger"|"success"|"info"
}

const Button = (props: PropsType) => {

    const css = cn({
        [s.button]: true,
        [s.danger]: props.type === "danger",
        [s.success]: props.type === "success",
        [s.info]: props.type === "info",
    })

    return (
        <input type="button"
            className={css}
        value={props.text}/>
    )
}

export default Button;