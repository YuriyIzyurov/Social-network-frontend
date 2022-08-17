import React from "react";
import {Button as BaseButton} from "antd";
import classNames from "classnames";
import "components/Button/Button.scss"

export const Button: React.FC<any> = (props) => {
    return <BaseButton {...props} className={classNames("button", props.className, {
        "button__large":props.size === "large",
        "button__small":props.size === "small"
    })}  />
}