import "./styles/ServerList.css";
import { useState } from "react";
import Modal from "../general/Modal/Modal";
import DownloadAppsCTA from "./DownloadAppsCTA";
import ServerIcon from "./ServerIcon";
import { FaDiscord } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { IoCompassSharp } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import NewServerCTA from "./NewServerCTA";
import { UserType } from "../../types/UserType";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../app/store";
import { ContextMenuCtx } from "../general/ContextMenu/ContextMenu";
import {
  removeServer,
  setActiveServer,
} from "../../features/servers/serversSlice";
import { ServerType } from "../../types/ServerType";

interface ServerListProps {
  activeUser: UserType;
  activeServer: ServerType | null;
}

function ServerList(props: ServerListProps) {
  const [dlAppsModal, setDLAppsModal] = useState(false);
  const [newServerModal, setNewServerModal] = useState(false);
  const [newServerModalStartingPage, setNewServerModalStartingPage] =
    useState(1);
  const servers = useSelector((state: StoreType) => state.servers.servers);
  const activeServerID = useSelector(
    (state: StoreType) => state.servers.activeServer
  );
  const dispatch = useDispatch();

  return (
    <ContextMenuCtx.Consumer>
      {(contextMenuCtx) => (
        <div className="serverList">
          <ServerIcon
            icon={FaDiscord}
            onClick={() => {
              dispatch(setActiveServer("home"));
            }}
            text="Home"
            active={activeServerID === "home"}
            variant="discord"
          />

          <div className="separator" />

          {servers.map((item) => (
            <ServerIcon
              imgSrc={item.iconSrc !== null ? item.iconSrc : undefined}
              text={item.name}
              active={item.id === activeServerID}
              onClick={() => {
                dispatch(setActiveServer(item.id));
              }}
              onContextMenu={(e) => {
                contextMenuCtx.setMenuDetails({
                  event: e.nativeEvent,
                  menuItems: [
                    {
                      groupItems: [
                        {
                          text: "Mark as Read",
                          disabled: true,
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Invite People",
                          colour: "discord",
                          disabled: true,
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Mute Server",
                          subMenuItems: [
                            {
                              groupItems: [
                                {
                                  text: "For 15 Minutes",
                                  disabled: true,
                                },
                                {
                                  text: "For 1 Hour",
                                  disabled: true,
                                },
                                {
                                  text: "For 3 Hours",
                                  disabled: true,
                                },
                                {
                                  text: "For 8 Hours",
                                  disabled: true,
                                },
                                {
                                  text: "For 24 Hours",
                                  disabled: true,
                                },
                                {
                                  text: "Until I turn it back on",
                                  disabled: true,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          text: "Notification Settings",
                          subMenuItems: [
                            {
                              groupType: "radio" as "radio" | "checklist",
                              groupItems: [
                                {
                                  text: "All Messages",
                                  disabled: true,
                                },
                                {
                                  text: "Only @mentions",
                                  active: true,
                                  disabled: true,
                                },
                                {
                                  text: "Nothing",
                                  disabled: true,
                                },
                              ],
                            },
                            {
                              groupType: "checklist" as "radio" | "checklist",
                              groupItems: [
                                {
                                  text: "Supress @everyone and @here",
                                  disabled: true,
                                },
                                {
                                  text: "Supress All Role @mentions",
                                  disabled: true,
                                },
                                {
                                  text: "Supress New Event Badges",
                                  disabled: true,
                                },
                              ],
                            },
                            {
                              groupType: "checklist" as "radio" | "checklist",
                              groupItems: [
                                {
                                  text: "Mobile Push Notifications",
                                  active: true,
                                  disabled: true,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          text: "Hide Muted Channels",
                          itemType: "checklist",
                          disabled: true,
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Privacy Settings",
                          disabled: true,
                        },
                        {
                          text: "Edit Server Profile",
                          disabled: true,
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Leave Server",
                          onClick: () => {
                            dispatch(setActiveServer(""));
                            dispatch(removeServer(item.id));
                            contextMenuCtx.disableMenu();
                          },
                          colour: "red",
                        },
                      ],
                    },
                  ],
                });
              }}
            />
          ))}

          <ServerIcon
            icon={AiOutlinePlus}
            text="Add a Server"
            active={newServerModal}
            onClick={() => {
              setNewServerModalStartingPage(1);
              setNewServerModal(true);
            }}
            onContextMenu={(e) => {
              contextMenuCtx.setMenuDetails({
                event: e.nativeEvent,
                menuItems: [
                  {
                    groupItems: [
                      {
                        text: "Join a server",
                        onClick: () => {
                          setNewServerModalStartingPage(4);
                          setNewServerModal(true);
                          contextMenuCtx.disableMenu();
                        },
                        disabled: true,
                      },
                      {
                        text: "Create a server",
                        onClick: () => {
                          setNewServerModalStartingPage(1);
                          setNewServerModal(true);
                          contextMenuCtx.disableMenu();
                        },
                      },
                    ],
                  },
                ],
              });
            }}
            disablePill
            variant="green"
          />
          <ServerIcon
            icon={IoCompassSharp}
            text="Explore Public Servers"
            onClick={() => {
              dispatch(setActiveServer("explore"));
            }}
            active={activeServerID === "explore"}
            variant="green"
          />

          <div className="separator" />

          <ServerIcon
            icon={HiOutlineDownload}
            text="Download Apps"
            active={dlAppsModal}
            onClick={() => setDLAppsModal(true)}
            variant="green"
          />

          {/* New Server Modal */}
          <Modal
            active={newServerModal}
            handleDisable={() => {
              setNewServerModal(false);
            }}
          >
            <NewServerCTA
              activeUser={props.activeUser}
              startingPage={newServerModalStartingPage}
            />
          </Modal>

          {/* Download Apps Modal */}
          <Modal
            active={dlAppsModal}
            handleDisable={() => {
              setDLAppsModal(false);
            }}
          >
            <DownloadAppsCTA />
          </Modal>
        </div>
      )}
    </ContextMenuCtx.Consumer>
  );
}

export default ServerList;
