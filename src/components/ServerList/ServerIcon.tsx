import { useState } from "react";
import { IconType } from "react-icons";
import { TooltipCtx } from "../general/Tooltip/Tooltip";
import "./styles/ServerIcon.css";

interface ServerIconProps {
  imgSrc?: string;
  icon?: IconType;
  text: string;
  variant?: "green" | "discord";
  onClick?: () => void;
  notification?: boolean;
  disablePill?: boolean;
}

function ServerIcon(props: ServerIconProps) {
  const [active, setActive] = useState(false);

  function ServerText(input: string) {
    let newText = input.charAt(0);
    return newText;
  }

  return (
    <TooltipCtx.Consumer>
      {(ctx) => (
        <div
          className={"serverIcon" + (props.variant ? ` ${props.variant}` : "")}
        >
          <button
            className={"wrapper" + (active ? " active" : "")}
            onClick={() => {
              setActive(true);
              props.onClick && props.onClick();
            }}
            onBlur={() => setActive(false)}
            onMouseEnter={(e) => {
              ctx.setDetails({
                text: props.text,
                parent: e.currentTarget as HTMLElement,
                parentSide: "right",
                offset: 10,
              });
            }}
            onMouseLeave={() => {
              ctx.disableTooltip();
            }}
          >
            {(props.imgSrc && (
              <img src={props.imgSrc} alt="" className="img" />
            )) ||
              (props.icon && (
                <div className="iconWrapper">
                  <props.icon className="icon" />
                </div>
              )) || <p className="text">{ServerText(props.text)}</p>}
          </button>
          <div
            className={
              "pill" +
              (props.notification ? " small" : "") +
              (active ? " big" : "") +
              (props.disablePill ? " disable" : "")
            }
          />
        </div>
      )}
    </TooltipCtx.Consumer>
  );
}

export default ServerIcon;
