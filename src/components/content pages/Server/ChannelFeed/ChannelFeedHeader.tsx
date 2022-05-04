import { useState } from "react";
import { AiFillPushpin } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdChatboxes, IoMdHelpCircle } from "react-icons/io";
import { MdInbox, MdPeopleAlt, MdVolumeUp } from "react-icons/md";
import { ChannelType } from "../../../../types/ChannelType";
import { TooltipCtx } from "../../../general/Tooltip/Tooltip";
import "./styles/ChannelFeedHeader.css";

interface ChannelFeedHeaderProps {
  activeChannel: ChannelType;
  setMemberListActive: (value: boolean) => void;
}

function ChannelFeedHeader(props: ChannelFeedHeaderProps) {
  const [memberPanelActive, setMemberPanelActive] = useState(true);

  function setMemberListActive(value: boolean) {
    setMemberPanelActive(value);
    props.setMemberListActive(value);
  }

  return (
    <div className="channelFeedHeader">
      <div className="title">
        {props.activeChannel.type === "text" ? (
          <BiHash className="type-icon text" />
        ) : (
          <MdVolumeUp className="type-icon voice" />
        )}
        <p className="channel-name">{props.activeChannel.name}</p>
      </div>
      <TooltipCtx.Consumer>
        {(tooltipCtx) => (
          <div className="icons">
            <IoMdChatboxes
              className="icon"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Threads",
                  parent: e.currentTarget as unknown as HTMLElement,
                  parentSide: "bottom",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
            <BsBellFill
              className="icon bell"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Notification Settings",
                  parent: e.currentTarget as unknown as HTMLElement,
                  parentSide: "bottom",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
            <AiFillPushpin
              className="icon"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Pinned Messages",
                  parent: e.currentTarget as unknown as HTMLElement,
                  parentSide: "bottom",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
            <MdPeopleAlt
              className={"icon" + (memberPanelActive ? " active" : "")}
              onClick={() => {
                setMemberListActive(!memberPanelActive);
              }}
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Toggle Member List",
                  parent: e.currentTarget as unknown as HTMLElement,
                  parentSide: "bottom",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
            <div className="search-wrapper">
              <input className="search" placeholder="Search" />
              <HiOutlineSearch className="search-icon" />
            </div>

            <MdInbox
              className="icon"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Inbox",
                  parent: e.currentTarget as unknown as HTMLElement,
                  parentSide: "bottom",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
            <IoMdHelpCircle
              className="icon"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Help",
                  parent: e.currentTarget as unknown as HTMLElement,
                  parentSide: "bottom",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
          </div>
        )}
      </TooltipCtx.Consumer>
    </div>
  );
}

export default ChannelFeedHeader;
