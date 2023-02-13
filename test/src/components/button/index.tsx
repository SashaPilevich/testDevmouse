import { MouseEventHandler } from "react";
import styles from "./styles.module.css"

interface IButton {
  label: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type:
    | "add"
    | "remove"
}
const getButtonStyle = (
  type:
    | "add"
    | "remove"
) => {
  if (type === "add") {
    return styles.add;
  }
  if (type === "remove") {
    return styles.remove;
  }
}
export const Button = (props:IButton) => {
  return(
    <button
      className={`${styles.button} ${
      getButtonStyle(props.type)
      }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}