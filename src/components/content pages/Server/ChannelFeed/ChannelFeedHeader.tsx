import { useState } from "react";
import { BiHash } from "react-icons/bi";
import { MdVolumeUp } from "react-icons/md";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../app/store";
import {
  ChannelCategoryType,
  ChannelType,
} from "../../../../types/ChannelType";
import { ServerType } from "../../../../types/ServerType";
import "./styles/ChannelFeedHeader.css";

interface ChannelFeedHeaderProps {
  activeServer: ServerType;
}

function ChannelFeedHeader(props: ChannelFeedHeaderProps) {
  const [memberPanelActive, setMemberPanelActive] = useState(false);

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
      <div className="icons"></div>
    </div>
  );
}

export default ChannelFeedHeader;
