import { useEffect, useState } from "react";
import { ServerType } from "../../../types/ServerType";
import Button from "../../general/Button/Button";
import "./styles/ServerSidebar.css";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { ChannelCategoryType, ChannelType } from "../../../types/ChannelType";
import { BiHash } from "react-icons/bi";
import { MdVolumeUp, MdPersonAddAlt1 } from "react-icons/md";
import { RiSettings5Fill } from "react-icons/ri";

interface ChannelProps {
  details: ChannelType;
}

function Channel(props: ChannelProps) {
  return (
    <button className="channel">
      <div className="details">
        {props.details.type === "text" ? (
          <BiHash className="type-icon text" />
        ) : (
          <MdVolumeUp className="type-icon voice" />
        )}
        <p className="name">{props.details.name}</p>
      </div>
      <div className="channel-icons">
        <MdPersonAddAlt1 className="icon" />
        <RiSettings5Fill className="icon" />
      </div>
    </button>
  );
}

interface ServerSidebarProps {
  activeServer: ServerType | null;
}

function ServerSidebar(props: ServerSidebarProps) {
  const [displayInvitePeopleCTA, setDisplayInvitePeopleCTA] = useState(false);
  const [headerMenuActive, setHeaderMenuActive] = useState(false);

  useEffect(() => {
    setDisplayInvitePeopleCTA(
      props.activeServer !== null
        ? props.activeServer.members.length === 1
        : false
    );
  }, [props.activeServer]);

  function isChannel(
    item: ChannelType | ChannelCategoryType
  ): item is ChannelType {
    return typeof (item as ChannelType).type !== "undefined";
  }

  function choose<T>(input: T[]): T {
    return input[Math.floor(Math.random() * input.length)];
  }

  return (
    <div className="serverSidebar">
      <button
        className={"header" + (headerMenuActive ? " menu-active" : "")}
        onClick={() => {
          setHeaderMenuActive(!headerMenuActive);
        }}
      >
        {props.activeServer !== null && (
          <>
            <div className="header-details">
              <p>{props.activeServer.name}</p>
            </div>
            {headerMenuActive ? (
              <IoMdClose className="menu-icon" />
            ) : (
              <IoChevronDown className="menu-icon" />
            )}
          </>
        )}
      </button>
      {props.activeServer !== null && (
        <>
          {displayInvitePeopleCTA &&
            choose([
              /* Invite Friends CTA */
              <div className="serverCTA">
                <img src="./assets/Server/invite_friends.svg" alt="" />
                <div className="text">
                  <p>An adventure begins.</p>
                  <p>Let's add some friends!</p>
                </div>

                <Button text="Invite People" size="sm" colour="discord" span />
                <IoMdClose
                  className="close"
                  onClick={() => {
                    setDisplayInvitePeopleCTA(false);
                  }}
                />
              </div>,
              // /* Boost Server CTA */
              // <div className="serverCTA">
              //   <img src="./assets/Server/server_boosts.svg" alt="" />
              //   <div className="text">
              //     <p>Server Boosts are her! Rally your</p>
              //     <p>friends to boost your server.</p>
              //   </div>

              //   <Button
              //     text={"See Levels & Perks"}
              //     size="sm"
              //     colour="discord"
              //     span
              //   />
              //   <IoMdClose
              //     className="close"
              //     onClick={() => {
              //       setDisplayInvitePeopleCTA(false);
              //     }}
              //   />
              // </div>,
            ])}
          <div className="channels-feed">
            {props.activeServer.channels.map((item) =>
              isChannel(item) ? (
                <Channel details={item} />
              ) : (
                <>
                  <div className="channelCategory">
                    <div className="details">
                      <IoChevronDown className="expand-icon" />
                      <p className="name">{item.name}</p>
                    </div>
                    <IoMdAdd className="add-icon" />
                  </div>
                  {item.channels.map((item) => (
                    <Channel details={item} />
                  ))}
                </>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ServerSidebar;
