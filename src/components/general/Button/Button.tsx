import "./styles/Button.css";
import { IconType } from "react-icons";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconType;
  text: string;
  span?: boolean;
  size?: "sm" | "md" | "lg";
  colour?: "dark" | "grey" | "light" | "green" | "discord" | "red";
  variant?: "outline";
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  return (
    <button
      className={
        "button" +
        (props.span ? " span" : "") +
        (props.size ? ` ${props.size}` : " md") +
        (props.colour ? ` ${props.colour}` : " dark") +
        (props.variant ? ` ${props.variant}` : "") +
        (props.disabled ? " disabled" : "")
      }
      onClick={!props.disabled ? props.onClick : undefined}
    >
      {props.icon && <props.icon className="icon" />}
      <p className="text">{props.text}</p>
    </button>
  );
}

export default Button;
