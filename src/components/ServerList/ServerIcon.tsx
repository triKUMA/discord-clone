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
  onContextMenu?: (e: React.MouseEvent) => void;
  notification?: boolean;
  disablePill?: boolean;
}

function ServerIcon(props: ServerIconProps) {
  const [active, setActive] = useState(false);

  function ServerText(input: string) {
    let newText = input;
    for (let i = 0; i < newText.length; i++) {
      if (newText.charAt(i).match(/[a-zA-Z]/)) {
        while (
          i + 1 < newText.length &&
          newText.charAt(i + 1).match(/[a-zA-Z]/)
        ) {
          if (i + 2 < newText.length) {
            newText = newText.slice(0, i + 1) + newText.slice(i + 2);
          } else {
            newText = newText.slice(0, i + 1);
          }
        }
      }
    }

    return newText.replaceAll("'s", "").replaceAll(" ", "");
  }

  return (
    <TooltipCtx.Consumer>
      {(tooltipCtx) => (
        <div
          className={"serverIcon" + (props.variant ? ` ${props.variant}` : "")}
        >
          <button
            className={"wrapper" + (active ? " active" : "")}
            onClick={() => {
              setActive(true);
              props.onClick && props.onClick();
            }}
            onContextMenu={(e) => {
              props.onContextMenu && props.onContextMenu(e);
            }}
            onBlur={() => setActive(false)}
            onMouseEnter={(e) => {
              tooltipCtx.setTooltipDetails({
                text: props.text,
                parent: e.currentTarget as HTMLElement,
                parentSide: "right",
                offset: 10,
              });
            }}
            onMouseLeave={() => {
              tooltipCtx.disableTooltip();
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
