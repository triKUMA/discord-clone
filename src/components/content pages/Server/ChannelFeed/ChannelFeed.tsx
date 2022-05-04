import { useState } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../../../../app/store";
import {
  ChannelCategoryType,
  ChannelType,
} from "../../../../types/ChannelType";
import { ServerType } from "../../../../types/ServerType";
import MemberList from "../MemberList/MemberList";
import ChannelFeedHeader from "./ChannelFeedHeader";
import ChannelFeedInput from "./ChannelFeedInput";
import "./styles/ChannelFeed.css";

interface ChannelFeedProps {
  activeServer: ServerType;
}

function ChannelFeed(props: ChannelFeedProps) {
  const [memberPanelActive, setMemberPanelActive] = useState(true);

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
    <div className="channelFeed-area-wrapper">
      <ChannelFeedHeader
        activeChannel={activeChannel}
        setMemberListActive={(input: boolean) => {
          setMemberPanelActive(input);
        }}
      />
      <div className="channelFeed-area">
        <div className="channelFeed-wrapper">
          <div className="channelFeed">
            {[...Array(15)].map((item, index) => (
              <div className="test" key={index}>{index}</div>
            ))}
          </div>
          <ChannelFeedInput activeChannel={activeChannel} />
        </div>
        {memberPanelActive && <MemberList />}
      </div>
    </div>
  );
}

export default ChannelFeed;
