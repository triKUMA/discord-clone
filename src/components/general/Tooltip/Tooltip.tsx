import { createContext, useLayoutEffect } from "react";
import "./styles/Tooltip.css";
import { GoTriangleLeft } from "react-icons/go";

export interface TooltipProps {
  text: string | null;
  parent: HTMLElement | null;
  parentSide: "left" | "right" | "top" | "bottom";
  offset?: number;
}

export const TooltipCtx = createContext({
  setDetails: (details: TooltipProps) => {},
  disableTooltip: () => {},
});

function Tooltip(props: TooltipProps) {
  useLayoutEffect(() => {
    if (props.parent !== null) {
      const arrowOffset = 10;
      const toolTip = document.getElementById("tooltip");
      const parentBoundBox = props.parent.getBoundingClientRect();

      switch (props.parentSide) {
        case "left": {
          let left = parentBoundBox.left - toolTip!.offsetWidth;
          if (typeof props.offset !== "undefined") {
            left -= props.offset + arrowOffset;
          }
          toolTip!.style.left = left + "px";

          toolTip!.style.top =
            parentBoundBox.top +
            parentBoundBox.height / 2 -
            toolTip!.offsetHeight / 2 +
            "px";
          break;
        }
        case "right": {
          let right = parentBoundBox.right;
          if (typeof props.offset !== "undefined") {
            right += props.offset + arrowOffset;
          }
          toolTip!.style.left = right + "px";

          toolTip!.style.top =
            parentBoundBox.top +
            parentBoundBox.height / 2 -
            toolTip!.offsetHeight / 2 +
            "px";
          break;
        }
        case "top": {
          let top = parentBoundBox.top - toolTip!.offsetHeight;
          if (typeof props.offset !== "undefined") {
            top -= props.offset + arrowOffset;
          }
          toolTip!.style.top = top + "px";

          toolTip!.style.left =
            parentBoundBox.left +
            parentBoundBox.width / 2 -
            toolTip!.offsetWidth / 2 +
            "px";
          break;
        }
        case "bottom": {
          let bottom = parentBoundBox.bottom;
          if (typeof props.offset !== "undefined") {
            bottom += props.offset + arrowOffset;
          }
          toolTip!.style.top = bottom + "px";

          toolTip!.style.left =
            parentBoundBox.left +
            parentBoundBox.width / 2 -
            toolTip!.offsetWidth / 2 +
            "px";
          break;
        }
      }
    }
  }, [props.parent]);

  return props.parent !== null ? (
    <div className={`tooltip ${props.parentSide}`} id={"tooltip"}>
      <div className="contents">
        <p className="text">{props.text}</p>
        <GoTriangleLeft className="triangle" />
      </div>
    </div>
  ) : null;
}

export default Tooltip;
