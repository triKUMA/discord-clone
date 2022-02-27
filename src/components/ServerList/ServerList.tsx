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
import { useSelector } from "react-redux";
import { StoreType } from "../../app/store";
import { ContextMenuCtx } from "../general/ContextMenu/ContextMenu";

interface ServerListProps {
  activeUser: UserType;
}

function ServerList(props: ServerListProps) {
  const [dlAppsModal, setDLAppsModal] = useState(false);
  const [newServerModal, setNewServerModal] = useState(false);
  const [newServerModalStartingPage, setNewServerModalStartingPage] =
    useState(1);
  const servers = useSelector((state: StoreType) => state.servers.servers);

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
            />
          ))}

          <ServerIcon
            icon={AiOutlinePlus}
            text="Add a Server"
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
