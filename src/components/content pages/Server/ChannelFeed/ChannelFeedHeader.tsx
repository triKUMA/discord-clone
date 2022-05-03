import { useState } from "react";
import { AiFillPushpin } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { BsBellFill } from "react-icons/bs";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdChatboxes, IoMdHelpCircle } from "react-icons/io";
import { MdInbox, MdPeopleAlt, MdVolumeUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../app/store";
import {
  ChannelCategoryType,
  ChannelType,
} from "../../../../types/ChannelType";
import { ServerType } from "../../../../types/ServerType";
import { TooltipCtx } from "../../../general/Tooltip/Tooltip";
import "./styles/ChannelFeedHeader.css";

interface ChannelFeedHeaderProps {
  activeServer: ServerType;
  setMemberListActive: (value: boolean) => void;
}

function ChannelFeedHeader(props: ChannelFeedHeaderProps) {
  const [memberPanelActive, setMemberPanelActive] = useState(true);

  function setMemberListActive(value: boolean) {
    setMemberPanelActive(value);
    props.setMemberListActive(value);
  }

  function isChannel(
    item: ChannelType | ChannelCategoryType
  ): item is ChannelType {
    return typeof (item as ChannelType).type !== "undefined";
  }

  const activeChannel = useSelector((state: StoreType) => {
    for (const channel of props.activeServer.channels) {
      if (isChannel(channel)) {
        if (channel.id === props.activeServer.activeChannel) {
          return channel;
        }
      } else {
        for (const c of channel.channels) {
          if (c.id === props.activeServer.activeChannel) {
            return c;
          }
        }
      }
    }

    // If no active channel set, then return the first channel in the list.
    if (isChannel(props.activeServer.channels[0])) {
      return props.activeServer.channels[0];
    } else {
      return props.activeServer.channels[0].channels[0];
    }
  });

  return (
    <div className="channelFeedHeader">
      <div className="title">
        {activeChannel.type === "text" ? (
          <BiHash className="type-icon text" />
        ) : (
          <MdVolumeUp className="type-icon voice" />
        )}
        <p className="channel-name">{activeChannel.name}</p>
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
