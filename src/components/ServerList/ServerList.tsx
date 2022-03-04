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
import { setActiveServer } from "../../features/servers/serversSlice";
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
  const dispatch = useDispatch();

  return (
    <ContextMenuCtx.Consumer>
      {(contextMenuCtx) => (
        <div className="serverList">
          <ServerIcon icon={FaDiscord} text="Home" variant="discord" />

          <div className="separator" />

          {servers.map((item) => (
            <ServerIcon
              imgSrc={item.iconSrc !== null ? item.iconSrc : undefined}
              text={item.name}
              active={item.id === props.activeServer?.id}
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
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Invite People",
                          colour: "discord",
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
                                },
                                {
                                  text: "For 1 Hour",
                                },
                                {
                                  text: "For 3 Hours",
                                },
                                {
                                  text: "For 8 Hours",
                                },
                                {
                                  text: "For 24 Hours",
                                },
                                {
                                  text: "Until I turn it back on",
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
                                },
                                {
                                  text: "Only @mentions",
                                  active: true,
                                },
                                {
                                  text: "Nothing",
                                },
                              ],
                            },
                            {
                              groupType: "checklist" as "radio" | "checklist",
                              groupItems: [
                                {
                                  text: "Supress @everyone and @here",
                                },
                                {
                                  text: "Supress All Role @mentions",
                                },
                                {
                                  text: "Supress New Event Badges",
                                },
                              ],
                            },
                            {
                              groupType: "checklist" as "radio" | "checklist",
                              groupItems: [
                                {
                                  text: "Mobile Push Notifications",
                                  active: true,
                                },
                              ],
                            },
                          ],
                        },
                        {
                          text: "Hide Muted Channels",
                          itemType: "checklist",
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Privacy Settings",
                        },
                        {
                          text: "Edit Server Profile",
                        },
                      ],
                    },
                    {
                      groupItems: [
                        {
                          text: "Leave Server",
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
