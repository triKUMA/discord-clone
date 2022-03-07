import { useEffect, useState } from "react";
import { ServerType } from "../../../types/ServerType";
import Button from "../../general/Button/Button";
import "./styles/ServerSidebar.css";
import { ChannelCategoryType, ChannelType } from "../../../types/ChannelType";
import ContextMenuItem from "../../general/ContextMenu/ContextMenuItem";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import { IoChevronDown, IoChevronForward } from "react-icons/io5";
import { RiSettings5Fill, RiShieldFlashFill } from "react-icons/ri";
import { GiFloatingCrystal } from "react-icons/gi";
import { BsBellFill, BsArrowLeftCircleFill } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { BiHash } from "react-icons/bi";
import { MdVolumeUp, MdPersonAddAlt1 } from "react-icons/md";
import { TooltipCtx } from "../../general/Tooltip/Tooltip";

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
      <TooltipCtx.Consumer>
        {(tooltipCtx) => (
          <div className="channel-icons">
            <MdPersonAddAlt1
              className="icon"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Create Invite",
                  parent: e.currentTarget as EventTarget as HTMLElement,
                  parentSide: "top",
                  size: "sm",
                });
              }}
              onMouseLeave={() => {
                tooltipCtx.disableTooltip();
              }}
            />
            <RiSettings5Fill
              className="icon"
              onMouseEnter={(e) => {
                tooltipCtx.setTooltipDetails({
                  text: "Edit Channel",
                  parent: e.currentTarget as EventTarget as HTMLElement,
                  parentSide: "top",
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
    document.addEventListener("mouseup", (e) => {
      const headerContextMenu = document.getElementById("header-details");
      const target = e.target as HTMLElement | null;

      if (headerContextMenu !== null && !headerContextMenu.contains(target)) {
        setHeaderMenuActive(false);
      }
    });
  }, []);

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
      <div
        className={"header" + (headerMenuActive ? " menu-active" : "")}
        onClick={() => {
          setHeaderMenuActive(!headerMenuActive);
        }}
      >
        {props.activeServer !== null && (
          <button
            className={
              "header-details" + (headerMenuActive ? " menu-active" : "")
            }
            id="header-details"
          >
            <p>{props.activeServer.name}</p>
            {headerMenuActive ? (
              <IoMdClose className="menu-icon" />
            ) : (
              <IoChevronDown className="menu-icon" />
            )}
            {headerMenuActive && (
              <div className="headerContextMenu">
                <ContextMenuItem
                  text="Server Boost"
                  icon={GiFloatingCrystal}
                  colour="pink"
                />
                <div className="separator" />
                <ContextMenuItem
                  text="Invite People"
                  icon={MdPersonAddAlt1}
                  colour="discord"
                />
                <div className="separator" />
                <ContextMenuItem
                  text="Notification Settings"
                  icon={BsBellFill}
                  disabled={true}
                />
                <ContextMenuItem
                  text="Privacy Settings"
                  icon={RiShieldFlashFill}
                />
                <div className="separator" />
                <ContextMenuItem text="Edit Server Profile" icon={FaPen} />
                <ContextMenuItem
                  text="Hide Muted Channels"
                  itemType="checklist"
                />
                <div className="separator" />
                <ContextMenuItem
                  text="Leave Server"
                  icon={BsArrowLeftCircleFill}
                  colour="red"
                />
              </div>
            )}
          </button>
        )}
      </div>
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
                <TooltipCtx.Consumer>
                  {(tooltipCtx) => (
                    <>
                      <div className="channelCategory">
                        <div className="details">
                          <IoChevronDown className="expand-icon" />
                          <p className="name">{item.name}</p>
                        </div>
                        <IoMdAdd
                          className="add-icon"
                          onMouseEnter={(e) => {
                            tooltipCtx.setTooltipDetails({
                              text: "Create Channel",
                              parent:
                                e.currentTarget as EventTarget as HTMLElement,
                              parentSide: "top",
                              size: "sm",
                            });
                          }}
                          onMouseLeave={() => {
                            tooltipCtx.disableTooltip();
                          }}
                        />
                      </div>
                      {item.channels.map((item) => (
                        <Channel details={item} />
                      ))}
                    </>
                  )}
                </TooltipCtx.Consumer>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ServerSidebar;
